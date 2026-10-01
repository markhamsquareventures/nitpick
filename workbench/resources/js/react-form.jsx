import { useState } from 'react';
import { createRoot } from 'react-dom/client';

// A form of controlled inputs. Each input shows React state, so a fill that React does not see is lost on the next render.
function Form() {
    const [state, setState] = useState({ name: '', country: 'us', subscribed: false, tier: 'free' });
    const [renders, setRenders] = useState(0);
    const set = (key, value) => setState((current) => ({ ...current, [key]: value }));

    return (
        <form>
            <label>
                Name
                <input name="name" value={state.name} onChange={(event) => set('name', event.target.value)} />
            </label>
            <label>
                Country
                <select name="country" value={state.country} onChange={(event) => set('country', event.target.value)}>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="mx">Mexico</option>
                </select>
            </label>
            <label>
                <input
                    type="checkbox"
                    name="subscribed"
                    checked={state.subscribed}
                    onChange={(event) => set('subscribed', event.target.checked)}
                />
                Subscribed
            </label>
            <fieldset>
                <legend>Tier</legend>
                {['free', 'pro', 'team'].map((tier) => (
                    <label key={tier}>
                        <input
                            type="radio"
                            name="tier"
                            value={tier}
                            checked={state.tier === tier}
                            onChange={(event) => set('tier', event.target.value)}
                        />
                        {tier}
                    </label>
                ))}
            </fieldset>
            <button type="button" id="rerender" onClick={() => setRenders(renders + 1)}>
                Render again
            </button>
            <p>
                Renders: <span id="renders">{renders}</span>
            </p>
            <pre id="state">{JSON.stringify(state)}</pre>
        </form>
    );
}

createRoot(document.getElementById('root')).render(<Form />);
