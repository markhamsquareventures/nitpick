import { render } from 'preact';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'preact/hooks';
import css from './panel.css';
import { errorMessage, request } from './api.js';
import { ChecklistTab } from './ChecklistTab.jsx';
import { ConfirmButton } from './ConfirmButton.jsx';
import { Icon } from './icons.jsx';
import { MailTab } from './MailTab.jsx';
import { PersonasTab } from './PersonasTab.jsx';
import { local } from './storage.js';

const SHORTCUT_LABEL = 'Alt+Shift+Q';

const TABS = [
    { key: 'checklist', label: 'Checklist', icon: 'listChecks' },
    { key: 'mail', label: 'Mail', icon: 'mail' },
    { key: 'personas', label: 'Personas', icon: 'users' },
];

/** State that is kept per browser in localStorage, so it survives a page load. */
function useStoredState(key, fallback) {
    const [value, setValue] = useState(() => local.read(key, fallback));

    const setStored = (next) => {
        setValue(next);
        local.write(key, next);
    };

    return [value, setStored];
}

function isShortcut(event) {
    return !event.isComposing && event.altKey && event.shiftKey && !event.ctrlKey && !event.metaKey && event.code === 'KeyQ';
}

function isTextField(element) {
    return element instanceof HTMLElement && (element.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName));
}

function Header({ scenarios, scenario, round, nextNumber, onSelectScenario, onRoundChange }) {
    const [busy, setBusy] = useState(false);
    const [failure, setFailure] = useState(null);
    const [reports, setReports] = useState([]);
    const pickerId = useId();

    const start = async () => {
        setBusy(true);
        setFailure(null);

        try {
            const data = await request('rounds', { method: 'POST', body: { scenario: scenario.slug } });
            setReports([]);
            onRoundChange(data.round);
        } catch (error) {
            setFailure(errorMessage(error));
        }

        setBusy(false);
    };

    const close = async () => {
        setFailure(null);

        try {
            const data = await request(`rounds/${round.round.id}`, { method: 'PATCH', body: { status: 'closed' } });
            setReports(data.reports);
            onRoundChange(null);
        } catch (error) {
            setFailure(errorMessage(error));
        }
    };

    const canPick = round === null && scenarios?.length > 1;
    let state = scenarios === null ? 'Loading…' : 'No scenarios yet';

    if (round !== null) {
        state = `Round ${round.round.number} · open`;
    } else if (scenario !== null) {
        state = `Round ${nextNumber} · not started`;
    }

    return (
        <header class="card-header">
            <div class="header-row">
                <div class="header-title">
                    {canPick ? (
                        <div class="picker">
                            <label class="visually-hidden" for={pickerId}>
                                Scenario
                            </label>
                            <select
                                id={pickerId}
                                class="picker-select"
                                value={scenario.slug}
                                onChange={(event) => onSelectScenario(event.currentTarget.value)}
                            >
                                {scenarios.map((candidate) => (
                                    <option key={candidate.slug} value={candidate.slug}>
                                        {candidate.title}
                                    </option>
                                ))}
                            </select>
                            <Icon name="chevronDown" />
                        </div>
                    ) : (
                        <h2 class="title">{round?.round.title ?? scenario?.title ?? 'Nitpick'}</h2>
                    )}
                    <p class="subtitle" data-round={round === null ? 'none' : 'open'}>
                        {state}
                    </p>
                </div>
                {round === null ? (
                    <button type="button" class="button light" disabled={busy || scenario === null} onClick={start}>
                        Start round
                    </button>
                ) : (
                    <ConfirmButton
                        label="Close round"
                        question={`Close round ${round.round.number} and write the report?`}
                        confirmLabel="Close round"
                        busyLabel="Closing…"
                        onConfirm={close}
                    />
                )}
            </div>

            {failure && (
                <p role="alert" class="note error">
                    {failure}
                </p>
            )}

            <div role="status">
                {reports.length > 0 && (
                    <p class="note">
                        Report written to{' '}
                        {reports.map((report) => (
                            <code key={report}>{report}</code>
                        ))}
                    </p>
                )}
            </div>
        </header>
    );
}

function App() {
    const [open, setOpen] = useStoredState('open', false);
    const [tab, setTab] = useStoredState('tab', 'checklist');
    const [scenarioSlug, setScenarioSlug] = useStoredState('scenario', null);
    const [scenarios, setScenarios] = useState(null);
    const [round, setRound] = useState(null);
    const [roundLoaded, setRoundLoaded] = useState(false);
    const [nextNumbers, setNextNumbers] = useState({});
    const [user, setUser] = useState(undefined);
    const pill = useRef(null);
    const tabList = useRef(null);
    const focusCardOnOpen = useRef(false);
    // A reload that finds the card open shows it at once; only a press or the shortcut animates it.
    const animateOpen = useRef(false);

    const loadUser = () => request('user').then((data) => setUser(data.user));

    const loadRound = () =>
        request('round').then((data) => {
            setRound(data.round);
            setNextNumbers(data.next_numbers);
            setRoundLoaded(true);
        });

    // A write answers the round; a close answers null, and the next numbers change.
    const onRoundChange = (next) => {
        setRound(next);

        if (next === null) {
            loadRound();
        }
    };

    const toggle = (focusCard) => {
        setOpen(!open);
        animateOpen.current = !open;
        focusCardOnOpen.current = !open && focusCard;

        if (open) {
            pill.current?.focus();
        }
    };

    // Escape closes the card from anywhere in the panel. An open two-step confirm stops the
    // event first, so there the first Escape only cancels the confirm.
    const onEscape = (event) => {
        if (event.key === 'Escape' && open && !event.isComposing) {
            toggle(false);
        }
    };

    // The card is not in the DOM until the render after toggle(), so the focus waits for it.
    useLayoutEffect(() => {
        if (open && focusCardOnOpen.current) {
            focusCardOnOpen.current = false;
            tabList.current?.querySelector('[aria-selected="true"]')?.focus();
        }
    }, [open]);

    useEffect(() => {
        request('scenarios').then((data) => setScenarios(data.data));
        loadUser();
        loadRound();
    }, []);

    // The document listeners are added once, so they call the toggle of the latest render.
    const latestToggle = useRef(toggle);
    latestToggle.current = toggle;

    // Keyboard, Inertia and Livewire events come from outside the panel.
    useEffect(() => {
        const onKeyDown = (event) => {
            if (!isShortcut(event) || isTextField(event.composedPath()[0])) {
                return;
            }

            event.preventDefault();
            latestToggle.current(true);
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('inertia:navigate', loadUser);
        document.addEventListener('livewire:navigated', loadUser);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('inertia:navigate', loadUser);
            document.removeEventListener('livewire:navigated', loadUser);
        };
    }, []);

    // The open round's scenario is server state, so it wins over the choice kept in localStorage.
    const selectedSlug = round?.round.scenario ?? scenarioSlug;
    const scenario = scenarios?.find((candidate) => candidate.slug === selectedSlug) ?? scenarios?.[0] ?? null;
    const persona = scenario?.personas.find((candidate) => candidate.email === user?.email);
    const currentName = user === undefined ? '' : (persona?.label ?? user?.email ?? 'Guest');
    const nextNumber = nextNumbers[scenario?.slug] ?? 1;

    const onTabKeyDown = (event) => {
        const index = TABS.findIndex((candidate) => candidate.key === tab);
        const moves = { ArrowRight: 1, ArrowLeft: TABS.length - 1, Home: -index, End: TABS.length - 1 - index };

        if (!(event.key in moves)) {
            return;
        }

        event.preventDefault();
        const next = TABS[(index + moves[event.key]) % TABS.length];
        setTab(next.key);
        tabList.current.querySelector(`#qa-tab-${next.key}`).focus();
    };

    return (
        <>
            {open && (
                <section
                    id="qa-card"
                    class="card"
                    aria-label="Nitpick"
                    data-enter={animateOpen.current}
                    data-loading={scenarios === null || !roundLoaded}
                    onKeyDown={onEscape}
                >
                    <Header
                        scenarios={scenarios}
                        scenario={scenario}
                        round={round}
                        nextNumber={nextNumber}
                        onSelectScenario={setScenarioSlug}
                        onRoundChange={onRoundChange}
                    />

                    <div id="qa-tabpanel" role="tabpanel" aria-labelledby={`qa-tab-${tab}`} class="view">
                        {tab === 'checklist' && (
                            <ChecklistTab
                                scenarios={scenarios}
                                scenario={scenario}
                                round={round}
                                ready={scenarios !== null && roundLoaded}
                                nextNumber={nextNumber}
                                currentEmail={user?.email}
                                onRoundChange={onRoundChange}
                            />
                        )}
                        {tab === 'mail' && <MailTab />}
                        {tab === 'personas' && <PersonasTab scenarios={scenarios} scenario={scenario} user={user} />}
                    </div>

                    <div ref={tabList} role="tablist" aria-label="Nitpick" class="tabbar" onKeyDown={onTabKeyDown}>
                        {TABS.map((candidate) => (
                            <button
                                key={candidate.key}
                                id={`qa-tab-${candidate.key}`}
                                type="button"
                                role="tab"
                                class="tab"
                                aria-selected={candidate.key === tab}
                                aria-controls="qa-tabpanel"
                                tabIndex={candidate.key === tab ? 0 : -1}
                                onClick={() => setTab(candidate.key)}
                            >
                                <Icon name={candidate.icon} />
                                {candidate.label}
                            </button>
                        ))}
                    </div>
                </section>
            )}

            <button
                ref={pill}
                type="button"
                class="pill"
                data-open={open}
                aria-expanded={open}
                aria-controls="qa-card"
                aria-label={open ? 'Close Nitpick' : undefined}
                aria-keyshortcuts={SHORTCUT_LABEL}
                title={open ? `Close (${SHORTCUT_LABEL})` : `Nitpick (${SHORTCUT_LABEL})`}
                onClick={() => toggle(false)}
                onKeyDown={onEscape}
            >
                {open ? (
                    <Icon name="x" size={20} />
                ) : (
                    <>
                        <span class="pill-brand">QA</span>
                        <span class="pill-separator" aria-hidden="true">
                            ·
                        </span>
                        <span class="pill-name">{currentName}</span>
                        {round && (
                            <span class="pill-round" title={`Round ${round.round.number} is open`}>
                                R{round.round.number}
                            </span>
                        )}
                        <Icon name="chevronRight" />
                    </>
                )}
            </button>
        </>
    );
}

class NitpickPanel extends HTMLElement {
    connectedCallback() {
        if (this.shadowRoot) {
            return;
        }

        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const root = document.createElement('div');
        style.textContent = css;
        root.className = 'root';
        shadow.append(style, root);
        render(<App />, root);
    }
}

// The script runs again when Livewire swaps <body>, so it defines and mounts the element once.
// The element is a child of <html>, not <body>, so a body swap does not remove it.
if (!customElements.get('nitpick-panel')) {
    customElements.define('nitpick-panel', NitpickPanel);
}

if (!document.querySelector('nitpick-panel')) {
    document.documentElement.append(document.createElement('nitpick-panel'));
}
