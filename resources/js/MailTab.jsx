import { useEffect, useState } from 'preact/hooks';
import { errorMessage, request, url } from './api.js';
import { Icon } from './icons.jsx';
import { Scroller } from './Scroller.jsx';

function sentTime(mail) {
    return new Date(mail.sent_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
}

/** The time for a mail of today, else the date, so that the row stays short. */
function sentShort(mail) {
    const sent = new Date(mail.sent_at);

    if (sent.toDateString() === new Date().toDateString()) {
        return sent.toLocaleTimeString([], { timeStyle: 'short' });
    }

    return sent.toLocaleDateString([], { dateStyle: 'short' });
}

function OpenMail({ mail, onBack }) {
    return (
        <div class="stack">
            <div>
                <button type="button" class="button secondary back" onClick={onBack}>
                    <Icon name="chevronLeft" />
                    All mail
                </button>
            </div>
            <div class="panel-card">
                <h3 class="item-text">{mail.subject || '-'}</h3>
                <p class="text muted">
                    To {mail.to} at {sentTime(mail)}
                </p>
            </div>
            <iframe class="mail-frame" sandbox="" title={`Mail: ${mail.subject}`} src={url(`mails/${mail.id}`)} />
            <section class="group">
                <div class="group-header">
                    <h3 class="group-title">Links</h3>
                </div>
                <div class="panel-card">
                    {mail.links.length === 0 ? (
                        <p class="text muted">The mail has no links.</p>
                    ) : (
                        <ul class="links">
                            {mail.links.map((link) => (
                                <li key={link}>
                                    <a class="link" href={link}>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </div>
    );
}

export function MailTab() {
    const [mails, setMails] = useState(null);
    const [queueSize, setQueueSize] = useState(null);
    const [working, setWorking] = useState(false);
    const [queueOutput, setQueueOutput] = useState(null);
    const [openMail, setOpenMail] = useState(null);
    const [error, setError] = useState(null);

    const load = () =>
        Promise.all([request('mails'), request('queue')])
            .then(([mailData, queueData]) => {
                setMails(mailData.data);
                setQueueSize(queueData.size);
            })
            .catch((failure) => {
                setMails([]);
                setError(errorMessage(failure));
            });

    useEffect(() => {
        load();
    }, []);

    const runQueue = async () => {
        setWorking(true);
        setQueueOutput(null);
        setError(null);

        try {
            const result = await request('queue', { method: 'POST' });

            if (result.exit_code !== 0) {
                setQueueOutput(result.output);
            }

            await load();
        } catch (failure) {
            setError(errorMessage(failure));
        }

        setWorking(false);
    };

    if (openMail) {
        return (
            <Scroller key="mail-open" name="mail-open" ready>
                <OpenMail mail={openMail} onBack={() => setOpenMail(null)} />
            </Scroller>
        );
    }

    const jobs = queueSize === 1 ? 'job' : 'jobs';

    return (
        <Scroller key="mail" name="mail" ready={mails !== null}>
            <div class="stack">
                <div class="panel-card queue">
                    <p class="text" aria-live="polite">
                        <span class="figure">{queueSize ?? '-'}</span> queued {jobs}
                    </p>
                    <button type="button" class="button light" disabled={working} onClick={runQueue}>
                        {working ? 'Running…' : 'Run queue'}
                    </button>
                </div>

                {error && (
                    <p role="alert" class="text error">
                        {error}
                    </p>
                )}

                {queueOutput && (
                    <div role="alert" class="failure">
                        <p class="text">The queue worker failed.</p>
                        <pre class="output">{queueOutput}</pre>
                    </div>
                )}

                {mails?.length === 0 && (
                    <p class="text muted">No mail yet. A queued mail shows here after Run queue.</p>
                )}

                {mails?.length > 0 && (
                    <section class="group">
                        <div class="group-header">
                            <h3 class="group-title">Captured mail</h3>
                        </div>
                        <ul class="rows">
                            {mails.map((mail) => (
                                <li key={mail.id}>
                                    <button type="button" class="row" onClick={() => setOpenMail(mail)}>
                                        <span class="row-text">
                                            <span class="row-title">{mail.subject || '-'}</span>
                                            <span class="row-meta">
                                                {mail.to} ·{' '}
                                                <time dateTime={mail.sent_at} title={sentTime(mail)}>
                                                    {sentShort(mail)}
                                                </time>
                                            </span>
                                        </span>
                                        <Icon name="chevronRight" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </Scroller>
    );
}
