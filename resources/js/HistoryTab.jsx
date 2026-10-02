import { useEffect, useState } from 'preact/hooks';
import { errorMessage, request } from './api.js';
import { STATUS_GLYPHS, STATUS_WORDS } from './ChecklistTab.jsx';
import { Icon } from './icons.jsx';
import { Scroller } from './Scroller.jsx';

function checkCount(count) {
    return count === 1 ? '1 check' : `${count} checks`;
}

/** The closed date, then the short git SHA when the app was a git repo. */
function roundMeta(round) {
    const parts = [new Date(round.closed_at).toLocaleDateString([], { dateStyle: 'medium' })];

    if (round.git_sha) {
        parts.push(`${round.git_sha.slice(0, 7)}${round.git_dirty ? ' (dirty)' : ''}`);
    }

    return parts.join(' · ');
}

function NitLines({ nits }) {
    if (nits.length === 0) {
        return null;
    }

    return (
        <ul class="nits">
            {nits.map((nit) => (
                <li key={nit.id} class="nit">
                    <p class="nit-body">
                        {nit.body} <code class="nit-path muted">({nit.url})</code>
                    </p>
                </li>
            ))}
        </ul>
    );
}

function groupTitle(group, personas) {
    if (group.type === 'handoff') {
        return group.title;
    }

    return personas.find((persona) => persona.key === group.persona)?.label ?? 'Guest';
}

/** One closed round, read only, in the short shape: what failed, what has nits, and counts for the rest. */
function OpenRound({ summary, onBack }) {
    const [round, setRound] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        request(`rounds/${summary.id}`)
            .then((data) => setRound(data.round))
            .catch((failure) => setError(errorMessage(failure)));
    }, [summary.id]);

    return (
        <div class="stack">
            <div>
                <button type="button" class="button secondary back" onClick={onBack}>
                    <Icon name="chevronLeft" />
                    All rounds
                </button>
            </div>
            <div class="panel-card">
                <h3 class="item-text">Round {summary.number}</h3>
                <p class="text muted">
                    Closed {roundMeta(summary)} by {summary.tester}
                </p>
                {summary.report && (
                    <p class="text muted">
                        <code>{summary.report}</code>
                    </p>
                )}
            </div>

            {error && (
                <p role="alert" class="text error">
                    {error}
                </p>
            )}

            {round?.groups.map((group, index) => (
                <section key={index} class="group">
                    <div class="group-header">
                        <h4 class="group-title">
                            {group.retest !== null && `Retest ${group.retest} · `}
                            {groupTitle(group, round.personas)}
                        </h4>
                        {group.passed > 0 && <p class="text muted history-passed">{group.passed} passed</p>}
                    </div>
                    {group.items.length > 0 && (
                        <ol class="items">
                            {group.items.map((item) => (
                                <li key={item.key} class="item" data-status={item.status}>
                                    <div class="item-row">
                                        <span class="box" data-status={item.status}>
                                            <span class="box-glyph">
                                                {STATUS_GLYPHS[item.status] && <Icon name={STATUS_GLYPHS[item.status]} size={12} />}
                                            </span>
                                            <span class="visually-hidden">{STATUS_WORDS[item.status]}</span>
                                        </span>
                                        <p class="item-toggle">
                                            <span class="check-text">{item.text}</span>
                                        </p>
                                    </div>
                                    {item.nits.length > 0 && (
                                        <div class="details">
                                            <NitLines nits={item.nits} />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ol>
                    )}
                </section>
            ))}

            {round?.base_not_tested > 0 && (
                <p class="text muted history-note">{checkCount(round.base_not_tested)} of the full checklist not tested</p>
            )}

            {round?.page_nits.length > 0 && (
                <section class="group">
                    <div class="group-header">
                        <h4 class="group-title">Page nits</h4>
                    </div>
                    <div class="panel-card">
                        <NitLines nits={round.page_nits} />
                    </div>
                </section>
            )}
        </div>
    );
}

export function HistoryTab({ scenario }) {
    const [rounds, setRounds] = useState(null);
    const [openRound, setOpenRound] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // The scenarios load after the panel mounts, so the tab waits for them.
        if (scenario === null) {
            return;
        }

        request(`rounds?scenario=${encodeURIComponent(scenario.slug)}`)
            .then((data) => setRounds(data.data))
            .catch((failure) => {
                setRounds([]);
                setError(errorMessage(failure));
            });
    }, [scenario?.slug]);

    if (openRound) {
        return (
            <Scroller key="history-open" name="history-open" ready>
                <OpenRound summary={openRound} onBack={() => setOpenRound(null)} />
            </Scroller>
        );
    }

    return (
        <Scroller key="history" name="history" ready={rounds !== null}>
            <div class="stack">
                {error && (
                    <p role="alert" class="text error">
                        {error}
                    </p>
                )}

                {rounds?.length === 0 && !error && (
                    <p class="text muted">No closed rounds yet. A round shows here after Close round.</p>
                )}

                {rounds?.length > 0 && (
                    <ul class="rows">
                        {rounds.map((round) => (
                            <li key={round.id}>
                                <button type="button" class="row" onClick={() => setOpenRound(round)}>
                                    <span class="row-text">
                                        <span class="row-title">Round {round.number}</span>
                                        <span class="row-meta">
                                            {roundMeta(round)} · {round.passed} passed · {round.failed} failed ·{' '}
                                            {round.nits === 1 ? '1 nit' : `${round.nits} nits`}
                                        </span>
                                    </span>
                                    <Icon name="chevronRight" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Scroller>
    );
}
