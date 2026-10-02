import { Fragment } from 'preact';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'preact/hooks';
import { errorMessage, request } from './api.js';
import { ConfirmButton } from './ConfirmButton.jsx';
import { fillForm } from './fill.js';
import { Icon } from './icons.jsx';
import { Scroller } from './Scroller.jsx';
import { local, openWithFocus } from './storage.js';

const NO_ROUND = 'Start a round to record results and nits';

function personaLabel(scenario, key) {
    if (key === 'guest') {
        return 'Guest';
    }

    return scenario.personas.find((persona) => persona.key === key)?.label ?? key;
}

function Failure({ failure }) {
    return (
        <div role="alert" class="failure">
            <p class="text">{failure.message}</p>
            {failure.output && <pre class="output">{failure.output}</pre>}
        </div>
    );
}

/** The accessible name keeps the persona, because the visible label is short. */
function LoginButton({ scenario, persona, current, focusKey, onFailure }) {
    const [busy, setBusy] = useState(false);

    const logIn = async () => {
        setBusy(true);

        try {
            const { redirect } = await request('login', { method: 'POST', body: { scenario: scenario.slug, persona } });
            openWithFocus(focusKey, redirect);
        } catch (error) {
            onFailure({ message: errorMessage(error) });
            setBusy(false);
        }
    };

    const label = persona === 'guest' ? 'Log out' : `Log in as ${personaLabel(scenario, persona)}`;
    let shortLabel = persona === 'guest' ? 'Log out' : 'Log in';

    if (current) {
        shortLabel = 'Current';
    }

    return (
        <button
            type="button"
            class="button secondary"
            aria-label={label}
            title={label}
            data-focus-key={focusKey}
            disabled={busy || current}
            onClick={logIn}
        >
            {shortLabel}
        </button>
    );
}

function ResetButton({ scenario, persona, focusKey, onFailure }) {
    const label = persona === 'guest' ? 'Reset, logged out' : `Reset as ${personaLabel(scenario, persona)}`;
    const question =
        persona === 'guest'
            ? 'Reset the database and stay logged out?'
            : `Reset the database and log in as ${personaLabel(scenario, persona)}?`;

    const reset = async () => {
        onFailure(null);

        try {
            const { redirect } = await request('reset', { method: 'POST', body: { scenario: scenario.slug, persona } });
            openWithFocus(focusKey, redirect);
        } catch (error) {
            onFailure({ message: errorMessage(error), output: error.data?.output });
        }
    };

    return (
        <ConfirmButton
            label="Reset"
            ariaLabel={label}
            focusKey={focusKey}
            question={question}
            confirmLabel="Reset"
            busyLabel="Resetting…"
            danger
            onConfirm={reset}
        />
    );
}

let writes = Promise.resolve();

/**
 * Sends the round writes one at a time, in the order of the clicks. Each write answers the full
 * round and the panel shows the last answer, so an answer must never overtake a newer write.
 */
function writeRound(send) {
    const answer = writes.then(send);
    writes = answer.catch(() => {});

    return answer;
}

/** The panel sends the page URL; the server keeps its path and records the persona of the login. */
async function addNit(round, itemKey, body) {
    const data = await writeRound(() =>
        request(`rounds/${round.round.id}/nits`, {
            method: 'POST',
            body: { item_key: itemKey, body, url: location.href },
        }),
    );

    return data.round;
}

/** An inline field under an item. Enter saves the nit. */
function NitField({ round, itemKey, label, inputRef, onRoundChange }) {
    const [body, setBody] = useState('');
    const [busy, setBusy] = useState(false);
    const [failure, setFailure] = useState(null);
    const inputId = useId();

    const save = async (event) => {
        event.preventDefault();

        if (body.trim() === '') {
            return;
        }

        setBusy(true);
        setFailure(null);

        try {
            onRoundChange(await addNit(round, itemKey, body));
            setBody('');
        } catch (error) {
            setFailure(errorMessage(error));
        }

        setBusy(false);
        inputRef.current?.focus();
    };

    return (
        <form class="nit-field" onSubmit={save}>
            <label class="visually-hidden" for={inputId}>
                {label}
            </label>
            <input
                ref={inputRef}
                id={inputId}
                class="input"
                type="text"
                autocomplete="off"
                maxLength={2000}
                placeholder="Add a nit…"
                title={round === null ? NO_ROUND : undefined}
                value={body}
                readOnly={busy}
                disabled={round === null}
                onInput={(event) => setBody(event.currentTarget.value)}
            />
            {failure && (
                <p role="alert" class="text error">
                    {failure}
                </p>
            )}
        </form>
    );
}

/**
 * A nit is one line: its text, then its page path in parens, then delete at the right. The
 * persona still lives in the store and the report; the panel just stops showing it here.
 */
function NitList({ round, nits, onRoundChange }) {
    if (nits.length === 0) {
        return null;
    }

    const destroy = (nit) => async () => {
        const data = await writeRound(() => request(`rounds/${round.round.id}/nits/${nit.id}`, { method: 'DELETE' }));
        onRoundChange(data.round);
    };

    return (
        <ul class="nits">
            {nits.map((nit) => (
                <li key={nit.id} class="nit">
                    <p class="nit-body">
                        {nit.body}
                        {' '}
                        <code class="nit-path muted">({nit.url})</code>
                    </p>
                    <ConfirmButton
                        ariaLabel={`Delete the nit: ${nit.body}`}
                        question="Delete this nit?"
                        confirmLabel="Delete"
                        busyLabel="Deleting…"
                        danger
                        triggerClass="button icon-button"
                        onConfirm={destroy(nit)}
                    >
                        <Icon name="trash" />
                    </ConfirmButton>
                </li>
            ))}
        </ul>
    );
}

// A click on the status box moves the item one step along this cycle.
const NEXT_STATUS = { untested: 'pass', pass: 'fail', fail: 'untested' };

const NEXT_ACTIONS = { untested: 'press to mark passed', pass: 'press to mark failed', fail: 'press to clear' };

export const STATUS_WORDS = { untested: 'not tested', pass: 'passed', fail: 'failed' };

export const STATUS_GLYPHS = { pass: 'check', fail: 'x' };

function nitCount(count) {
    return count === 1 ? '1 nit' : `${count} nits`;
}

/**
 * The result of the last fill of an item. A status region reads all of its text on each change,
 * so the summary comes first, then each filled key and its value, then the keys that need attention.
 */
function FillNotice({ report }) {
    const { total, filled, problems, several, missing } = report;
    let summary = `Filled ${filled.length} of ${total} fields.`;

    if (total === 0) {
        summary = 'The fill has no fields.';
    }

    return (
        <ul class="fill-lines">
            <li class="fill-summary">{summary}</li>
            {filled.map(({ key, value }) => (
                <li key={key}>
                    <code class="fill-key">{key}</code> {value}
                </li>
            ))}
            {problems.map(({ key, message }) => (
                <li key={key}>
                    <code class="fill-key">{key}</code> Not filled. {message}
                </li>
            ))}
            {several.map(({ key, count }) => (
                <li key={key}>
                    {count} matches for <code class="fill-key">{key}</code>. Nitpick filled the first.
                </li>
            ))}
            {missing.length > 0 && (
                <li>
                    Not found:{' '}
                    {missing.map((key, index) => (
                        <Fragment key={key}>
                            {index > 0 && ', '}
                            <code class="fill-key">{key}</code>
                        </Fragment>
                    ))}
                </li>
            )}
        </ul>
    );
}

function ChecklistItem({ scenario, item, round, result, onRoundChange }) {
    // The status of the last click. It shows in place of the server status until the item's
    // last write has an answer, so a slow answer never takes the box back to an older click.
    const [desired, setDesired] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [failure, setFailure] = useState(null);
    const [filling, setFilling] = useState(false);
    const [fillReport, setFillReport] = useState(null);
    const [fillFailure, setFillFailure] = useState(null);
    const latest = useRef(null);
    const queued = useRef(false);
    const focusNit = useRef(false);
    const nitInput = useRef(null);
    const detailsId = useId();
    const nits = result?.nits ?? [];
    const status = desired ?? result?.status ?? 'untested';
    const next = NEXT_STATUS[status];

    useLayoutEffect(() => {
        if (expanded && focusNit.current) {
            focusNit.current = false;
            nitInput.current?.focus();
        }
    }, [expanded]);

    // A fill notice is about the current page. A full page load clears it; an Inertia or a
    // Livewire visit keeps the panel, so the notice clears on their navigation events.
    useEffect(() => {
        if (fillReport === null) {
            return;
        }

        const clear = () => setFillReport(null);
        document.addEventListener('inertia:navigate', clear);
        document.addEventListener('livewire:navigated', clear);

        return () => {
            document.removeEventListener('inertia:navigate', clear);
            document.removeEventListener('livewire:navigated', clear);
        };
    }, [fillReport]);

    // Fill needs no open round. The server runs the fill on each press, so a fake() value is new each time.
    const fill = async () => {
        if (filling) {
            return;
        }

        setFilling(true);
        setFillReport(null);
        setFillFailure(null);

        try {
            const { fields } = await request('fill', { method: 'POST', body: { scenario: scenario.slug, item: item.key } });
            setFillReport(fillForm(fields));
        } catch (error) {
            setFillFailure({ message: errorMessage(error), output: error.data?.output });
        }

        setFilling(false);
    };

    // Clicks that come while a write of this item waits in the queue only change the target of
    // that write, so the server gets the last click and not every click.
    const save = async () => {
        let target = null;

        try {
            const data = await writeRound(() => {
                queued.current = false;
                target = latest.current;
                const path = `rounds/${round.round.id}/results/${encodeURIComponent(item.key)}`;

                if (target === 'untested') {
                    return request(path, { method: 'DELETE' });
                }

                return request(path, { method: 'PUT', body: { status: target } });
            });
            onRoundChange(data.round);
        } catch (error) {
            setFailure(errorMessage(error));
        }

        // A newer click keeps its status on the box until its own write has an answer.
        if (latest.current === target) {
            setDesired(null);
        }
    };

    const cycle = () => {
        latest.current = next;
        setDesired(next);
        setFailure(null);

        // A hidden field cannot take the focus, so on a closed details area the focus waits for the render.
        if (next === 'fail' && expanded) {
            nitInput.current?.focus();
        }

        if (next === 'fail' && !expanded) {
            focusNit.current = true;
            setExpanded(true);
        }

        // The click that clears a failed item also closes its details area when it has no nits.
        if (next === 'untested' && nits.length === 0) {
            setExpanded(false);
        }

        if (!queued.current) {
            queued.current = true;
            save();
        }
    };

    return (
        <li class="item" data-status={status}>
            <div class="item-row">
                <button
                    type="button"
                    class="box"
                    data-status={status}
                    aria-label={`${item.text}, ${STATUS_WORDS[status]}, ${NEXT_ACTIONS[status]}`}
                    title={round === null ? NO_ROUND : undefined}
                    disabled={round === null}
                    onClick={cycle}
                >
                    <span class="box-glyph">{STATUS_GLYPHS[status] && <Icon name={STATUS_GLYPHS[status]} size={12} />}</span>
                </button>
                <button
                    type="button"
                    class="item-toggle"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => setExpanded(!expanded)}
                >
                    <span class="check-text">{item.text}</span>
                    {(item.setup || nits.length > 0) && (
                        <span class="item-meta">
                            {item.setup}
                            {item.setup && nits.length > 0 && ' · '}
                            {nits.length > 0 && <span class="nit-count">{nitCount(nits.length)}</span>}
                        </span>
                    )}
                </button>
                {item.fill !== null && (
                    <button
                        type="button"
                        class="fill"
                        aria-label={`Fill the form for: ${item.text}`}
                        title={`Fill the form for: ${item.text}`}
                        aria-disabled={filling}
                        onClick={fill}
                    >
                        <Icon name="textCursorInput" />
                    </button>
                )}
                {item.url && (
                    <a class="goto" href={item.url} aria-label={`Go to ${item.url}`} title={`Go to ${item.url}`}>
                        <Icon name="arrowRight" />
                    </a>
                )}
            </div>
            {item.fill !== null && (
                <div role="status" class="fill-notice">
                    {fillReport && <FillNotice report={fillReport} />}
                </div>
            )}
            {fillFailure && (
                <div class="item-failure">
                    <Failure failure={fillFailure} />
                </div>
            )}
            {failure && (
                <p role="alert" class="text error item-error">
                    {failure}
                </p>
            )}
            <div id={detailsId} class="details" hidden={!expanded}>
                {round && <NitList round={round} nits={nits} onRoundChange={onRoundChange} />}
                <NitField
                    round={round}
                    itemKey={item.key}
                    label={`Nit on: ${item.text}`}
                    inputRef={nitInput}
                    onRoundChange={onRoundChange}
                />
            </div>
        </li>
    );
}

function Group({ scenario, group, index, Heading, currentEmail, itemProps }) {
    const [failure, setFailure] = useState(null);
    const isSection = group.type === 'section';
    const resetPersona = isSection ? group.persona : group.items[0].persona;
    const loginProps = (persona) => ({
        scenario,
        persona,
        current: persona !== 'guest' && personaEmail(scenario, persona) === currentEmail,
        focusKey: `login:${index}:${persona}`,
        onFailure: setFailure,
    });

    return (
        <section class="group">
            <div class="group-header">
                <Heading class="group-title">{isSection ? personaLabel(scenario, group.persona) : group.title}</Heading>
                {isSection && <LoginButton {...loginProps(group.persona)} />}
                <ResetButton scenario={scenario} persona={resetPersona} focusKey={`reset:${index}`} onFailure={setFailure} />
            </div>
            {failure && <Failure failure={failure} />}
            <ol class="items">
                {group.items.map((item, itemIndex) => (
                    <Fragment key={item.key}>
                        {!isSection && item.persona !== group.items[itemIndex - 1]?.persona && (
                            <li class="handoff-step">
                                <p class="text muted">As {personaLabel(scenario, item.persona)}</p>
                                <LoginButton {...loginProps(item.persona)} />
                            </li>
                        )}
                        <ChecklistItem scenario={scenario} item={item} {...itemProps(item)} />
                    </Fragment>
                ))}
            </ol>
        </section>
    );
}

function personaEmail(scenario, key) {
    return scenario.personas.find((persona) => persona.key === key)?.email;
}

function OrphanedGroup({ round, onRoundChange }) {
    const { results, nits } = round.orphaned;
    const keys = [...new Set([...results.map((result) => result.item_key), ...nits.map((nit) => nit.item_key)])].sort();

    if (keys.length === 0) {
        return null;
    }

    return (
        <section class="group">
            <div class="group-header">
                <h3 class="group-title">Orphaned</h3>
            </div>
            <ul class="items">
                {keys.map((key) => {
                    const status = results.find((result) => result.item_key === key)?.status ?? 'untested';
                    const keyNits = nits.filter((nit) => nit.item_key === key);

                    return (
                        <li key={key} class="item">
                            <div class="item-row">
                                <span class="box" data-status={status}>
                                    <span class="box-glyph">
                                        {STATUS_GLYPHS[status] && <Icon name={STATUS_GLYPHS[status]} size={12} />}
                                    </span>
                                    <span class="visually-hidden">{STATUS_WORDS[status]}</span>
                                </span>
                                <p class="item-toggle">
                                    <code class="check-text">{key}</code>
                                </p>
                            </div>
                            {keyNits.length > 0 && (
                                <div class="details">
                                    <NitList round={round} nits={keyNits} onRoundChange={onRoundChange} />
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

/**
 * The base groups of a retest round, behind a toggle. The open state is kept per round in
 * localStorage, because a login or a reset loads a new page and must find its button again.
 */
function FullChecklist({ storageKey, count, children }) {
    const [open, setOpen] = useState(() => local.read(storageKey, false));
    const contentId = useId();

    const toggle = () => {
        setOpen(!open);
        local.write(storageKey, open ? null : true);
    };

    return (
        <>
            <h3 class="full-heading">
                <button type="button" class="full-toggle" aria-expanded={open} aria-controls={contentId} onClick={toggle}>
                    Full checklist
                    <span class="full-count">{count === 1 ? '1 check' : `${count} checks`}</span>
                    <Icon name="chevronDown" />
                </button>
            </h3>
            <div id={contentId} class="stack" hidden={!open}>
                {children}
            </div>
        </>
    );
}

/** The page-nit field, pinned under the Checklist's scroll area. */
function NitComposer({ round, onRoundChange }) {
    const [body, setBody] = useState('');
    const [busy, setBusy] = useState(false);
    const [failure, setFailure] = useState(null);
    const input = useRef(null);
    const inputId = useId();

    const save = async (event) => {
        event.preventDefault();
        setBusy(true);
        setFailure(null);

        try {
            onRoundChange(await addNit(round, null, body));
            setBody('');
        } catch (error) {
            setFailure(errorMessage(error));
        }

        setBusy(false);
        input.current?.focus();
    };

    return (
        <form class="composer" onSubmit={save}>
            {failure && (
                <p role="alert" class="text error">
                    {failure}
                </p>
            )}
            <div class="composer-field">
                <label class="visually-hidden" for={inputId}>
                    Page nit
                </label>
                <input
                    ref={input}
                    id={inputId}
                    class="composer-input"
                    type="text"
                    autocomplete="off"
                    maxLength={2000}
                    placeholder="Note something on this page…"
                    title={round === null ? NO_ROUND : undefined}
                    value={body}
                    readOnly={busy}
                    disabled={round === null}
                    onInput={(event) => setBody(event.currentTarget.value)}
                />
                <button
                    type="submit"
                    class="send"
                    aria-label="Add page nit"
                    title="Add page nit"
                    disabled={busy || round === null || body.trim() === ''}
                >
                    <Icon name="arrowUp" />
                </button>
            </div>
        </form>
    );
}

export function ChecklistTab({ scenarios, scenario, round, ready, nextNumber, currentEmail, onRoundChange }) {
    if (scenarios !== null && scenario === null) {
        return (
            <Scroller name="checklist" ready>
                <p class="text">
                    There are no scenarios yet. Make one with <code>php artisan make:nitpick-scenario Name</code>.
                </p>
            </Scroller>
        );
    }

    if (!ready) {
        return <Scroller name="checklist" ready={false} />;
    }

    // Round n checks the groups outside retest() blocks and the groups of retest(n).
    const roundNumber = round?.round.number ?? nextNumber;
    // An open round of a scenario class that was renamed or removed has no checklist; its results show as orphaned.
    const roundHasScenario = round === null || round.round.scenario === scenario.slug;
    const groups = scenario.groups.filter(
        (group) => roundHasScenario && (group.retest === null || group.retest === roundNumber),
    );
    // In a round with retest groups, the retest is the work, and the base groups wait behind the full checklist toggle.
    const isRetestRound = groups.some((group) => group.retest !== null);
    const results = new Map((round?.groups ?? []).flatMap((group) => group.items).map((item) => [item.key, item]));
    const itemProps = (item) => ({ round, result: results.get(item.key), onRoundChange });

    // The index is the group's place in the round, so a focus key stays the same when the toggle opens.
    const renderGroup = (group, index, Heading) => (
        <Group
            key={index}
            scenario={scenario}
            group={group}
            index={index}
            Heading={Heading}
            currentEmail={currentEmail}
            itemProps={itemProps}
        />
    );

    return (
        <>
            <Scroller name="checklist" ready>
                <div class="stack">
                    {!isRetestRound && groups.map((group, index) => renderGroup(group, index, 'h3'))}

                    {isRetestRound && (
                        <>
                            <h3 class="retest">Retest {roundNumber}</h3>
                            {groups.map((group, index) => group.retest !== null && renderGroup(group, index, 'h4'))}
                            <FullChecklist
                                key={`full.${scenario.slug}.${roundNumber}`}
                                storageKey={`full.${scenario.slug}.${roundNumber}`}
                                count={groups.filter((group) => group.retest === null).flatMap((group) => group.items).length}
                            >
                                {groups.map((group, index) => group.retest === null && renderGroup(group, index, 'h4'))}
                            </FullChecklist>
                        </>
                    )}

                    <section class="group">
                        <div class="group-header">
                            <h3 class="group-title">Page nits</h3>
                        </div>
                        <div class="panel-card">
                            {round && round.page_nits.length > 0 ? (
                                <NitList round={round} nits={round.page_nits} onRoundChange={onRoundChange} />
                            ) : (
                                <p class="text muted">A page nit is a note on the page, not on an item. Add one below.</p>
                            )}
                        </div>
                    </section>

                    {round && <OrphanedGroup round={round} onRoundChange={onRoundChange} />}
                </div>
            </Scroller>
            <NitComposer round={round} onRoundChange={onRoundChange} />
        </>
    );
}
