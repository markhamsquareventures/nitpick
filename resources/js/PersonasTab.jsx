import { useId, useRef, useState } from 'preact/hooks';
import { errorMessage, request } from './api.js';
import { Icon } from './icons.jsx';
import { Scroller } from './Scroller.jsx';
import { openWithFocus } from './storage.js';

function UserRows({ rows, currentEmail, busy, onLogIn }) {
    return (
        <ul class="rows">
            {rows.map((row) => {
                const name = row.name || row.email;
                const current = row.email === currentEmail;

                return (
                    <li key={row.email} class="row" data-current={current}>
                        <span class="avatar" aria-hidden="true">
                            {name.charAt(0).toUpperCase()}
                        </span>
                        <span class="row-text">
                            <span class="row-title">{row.name || '-'}</span>
                            <span class="row-meta">{row.email}</span>
                        </span>
                        <button
                            type="button"
                            class="button secondary"
                            aria-label={`Log in as ${name}`}
                            title={`Log in as ${name}`}
                            data-focus-key={`login:${row.email}`}
                            disabled={busy || current}
                            onClick={() => onLogIn(row.body, `login:${row.email}`)}
                        >
                            {current ? 'Current' : 'Log in'}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export function PersonasTab({ scenarios, scenario, user }) {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);
    const searchTimer = useRef(null);
    const searchId = useId();

    const logIn = async (body, focusKey) => {
        setBusy(true);
        setError(null);

        try {
            const { redirect } = await request('login', { method: 'POST', body });
            openWithFocus(focusKey, redirect);
        } catch (failure) {
            setError(errorMessage(failure));
            setBusy(false);
        }
    };

    const search = (event) => {
        const term = event.currentTarget.value.trim();
        clearTimeout(searchTimer.current);

        if (term === '') {
            setResults(null);

            return;
        }

        searchTimer.current = setTimeout(() => {
            request(`users?search=${encodeURIComponent(term)}`)
                .then((data) => setResults(data.data))
                .catch((failure) => setError(errorMessage(failure)));
        }, 200);
    };

    const personaRows = (scenario?.personas ?? []).map((persona) => ({
        name: persona.label,
        email: persona.email,
        body: { scenario: scenario.slug, persona: persona.key },
    }));

    const resultRows = (results ?? []).map((result) => ({ ...result, body: { email: result.email } }));

    return (
        <Scroller name="personas" ready={scenarios !== null}>
            <div class="stack">
                {error && (
                    <p role="alert" class="text error">
                        {error}
                    </p>
                )}

                <section class="group">
                    <div class="group-header">
                        <h3 class="group-title">Personas</h3>
                    </div>
                    {scenarios?.length === 0 && <p class="text muted">There are no scenarios yet.</p>}
                    {personaRows.length > 0 && (
                        <UserRows rows={personaRows} currentEmail={user?.email} busy={busy} onLogIn={logIn} />
                    )}
                </section>

                <section class="group">
                    <div class="group-header">
                        <h3 class="group-title">Find a user</h3>
                    </div>
                    <div class="search">
                        <Icon name="search" />
                        <label class="visually-hidden" for={searchId}>
                            Find a user by email or name
                        </label>
                        <input
                            id={searchId}
                            class="search-input"
                            type="search"
                            autocomplete="off"
                            onInput={search}
                        />
                    </div>
                    {results?.length === 0 && <p class="text muted">No user matches.</p>}
                    {results?.length > 0 && (
                        <UserRows rows={resultRows} currentEmail={user?.email} busy={busy} onLogIn={logIn} />
                    )}
                </section>

                <div>
                    <button
                        type="button"
                        class="button secondary"
                        data-focus-key="logout"
                        disabled={busy || !user || !scenario}
                        onClick={() => logIn({ scenario: scenario?.slug, persona: 'guest' }, 'logout')}
                    >
                        {user ? 'Log out' : 'Logged out'}
                    </button>
                </div>
            </div>
        </Scroller>
    );
}
