// Fills the form fields of the host page with the fields of a fill. It searches `document`, so it
// does not find the panel's own fields, which are in a shadow root. It never submits a form.

// A key with no CSS syntax, other than the brackets of a form name: `email`, `team[name]`, `roles[]`.
const BARE_KEY = /^[A-Za-z_][\w-]*(\[[\w-]*\])*$/;

const NOT_FILLABLE_TYPES = ['file', 'button', 'submit', 'reset', 'image'];

function query(selector) {
    try {
        return [...document.querySelectorAll(selector)];
    } catch {
        return null;
    }
}

/** The elements that the key names, or null when the key is not a valid CSS selector. */
function matches(key) {
    if (!BARE_KEY.test(key)) {
        return query(key);
    }

    const named = query(`[name="${CSS.escape(key)}"]`);

    return named.length > 0 ? named : query(`#${CSS.escape(key)}`);
}

/** A radio group or a checkbox group of the same form is one field. */
function fieldOf(element) {
    if (!(element instanceof HTMLInputElement) || !['radio', 'checkbox'].includes(element.type) || element.name === '') {
        return [element];
    }

    return query(`input[type="${element.type}"][name="${CSS.escape(element.name)}"]`).filter(
        (member) => member.form === element.form,
    );
}

// React reads a checkbox or a radio on `click`, not on `change`, so a change of the `checked`
// property does not get to a React onChange. A click changes the box and sends click, input and
// change, which React, Vue, Alpine and Livewire all read. A box that has the state already gets
// no click, because a click toggles it.
function setChecked(box, checked) {
    if (box.checked !== checked) {
        box.click();
    }
}

/** Sets the text of an input or a textarea with the native setter, so that React's value tracker sees the change. */
function fillText(element, value) {
    if (typeof value !== 'string') {
        return 'This field takes one text value, not a list or true or false.';
    }

    const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));

    // A browser removes line breaks from a one-line input and spaces from an email, and a date
    // or a number input clears itself when the value has the wrong format. Only the last is a problem.
    const normalize = (text) => text.replaceAll('\r\n', '\n').replaceAll(/[\r\n]/g, '').trim();

    if (normalize(element.value) !== normalize(value)) {
        return `The field did not take the value "${value}".`;
    }

    return null;
}

/** Sets the value on the field and gives a problem message, or null when the value fits. */
function fillField(field, value) {
    const [element] = field;

    if (element instanceof HTMLSelectElement && element.multiple) {
        const values = typeof value === 'string' ? [value] : value;

        if (!Array.isArray(values)) {
            return 'This select takes a list of option values, not true or false.';
        }

        const options = [...element.options];
        options.forEach((option) => {
            option.selected = values.includes(option.value);
        });
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
        const unknown = values.filter((candidate) => !options.some((option) => option.value === candidate));

        if (unknown.length > 0) {
            return `There is no option with the value "${unknown.join('", "')}". The other values are selected.`;
        }

        return null;
    }

    // An empty value clears the select, the same as a text field: no option is selected.
    if (element instanceof HTMLSelectElement) {
        if (typeof value !== 'string') {
            return 'This select takes one option value, not a list or true or false.';
        }

        if (value !== '' && ![...element.options].some((option) => option.value === value)) {
            return `There is no option with the value "${value}".`;
        }

        Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set.call(element, value);
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));

        return null;
    }

    if (element.type === 'radio') {
        if (typeof value !== 'string') {
            return 'A radio group takes one value, not a list or true or false.';
        }

        const radio = field.find((candidate) => candidate.value === value);

        if (radio === undefined) {
            return `There is no radio with the value "${value}".`;
        }

        setChecked(radio, true);

        return null;
    }

    if (element.type === 'checkbox') {
        if (typeof value === 'boolean' && field.length > 1) {
            return `This is a group of ${field.length} checkboxes. Use a list of the values to check.`;
        }

        if (typeof value === 'boolean') {
            setChecked(element, value);

            return null;
        }

        const values = typeof value === 'string' ? [value] : value;
        field.forEach((checkbox) => setChecked(checkbox, values.includes(checkbox.value)));
        const unknown = values.filter((candidate) => !field.some((checkbox) => checkbox.value === candidate));

        if (unknown.length > 0) {
            return `There is no checkbox with the value "${unknown.join('", "')}". The other values are set.`;
        }

        return null;
    }

    return fillText(element, value);
}

/**
 * Fills each field and gives a report for the notice: filled [{key, value}] with the value as
 * text, missing [key], problems [{key, message}] for a value that does not fit or a field that
 * Nitpick cannot fill, and several [{key, count}] for a key with more than one visible field.
 */
export function fillForm(fields) {
    const report = { total: fields.length, filled: [], missing: [], problems: [], several: [] };

    for (const { key, value } of fields) {
        const elements = matches(key);

        if (elements === null) {
            report.problems.push({ key, message: 'The key is not a field name or a valid CSS selector.' });
            continue;
        }

        if (elements.length === 0) {
            report.missing.push(key);
            continue;
        }

        // getClientRects() is empty for display: none, a hidden parent and a closed <dialog>. A
        // type="hidden" input has no box either, but an app can keep its state in one, so it is
        // the fallback when no field is visible. It is not first: a form often puts a hidden "0"
        // input in front of a checkbox with the same name.
        const visible = elements.filter((element) => element.getClientRects().length > 0);
        const hiddenInputs = elements.filter((element) => element.type === 'hidden');
        const candidates = visible.length > 0 ? visible : hiddenInputs;

        if (candidates.length === 0) {
            report.problems.push({ key, message: 'The page has this field, but it is not visible.' });
            continue;
        }

        const groups = [];

        for (const element of candidates) {
            if (!groups.some((group) => group.includes(element))) {
                groups.push(fieldOf(element));
            }
        }

        if (groups.length > 1) {
            report.several.push({ key, count: groups.length });
        }

        const [field] = groups;
        const [element] = field;
        const fillable =
            element instanceof HTMLTextAreaElement ||
            element instanceof HTMLSelectElement ||
            (element instanceof HTMLInputElement && !NOT_FILLABLE_TYPES.includes(element.type));

        if (!fillable) {
            const kind = element instanceof HTMLInputElement ? `${element.type} input` : `<${element.localName}> element`;
            report.problems.push({ key, message: `Nitpick cannot fill a ${kind}.` });
            continue;
        }

        const problem = fillField(field, value);

        if (problem !== null) {
            report.problems.push({ key, message: problem });
            continue;
        }

        let text = value;

        if (Array.isArray(value)) {
            text = value.length === 0 ? 'none' : value.join(', ');
        }

        if (typeof value === 'boolean') {
            text = value ? 'checked' : 'not checked';
        }

        if (value === '') {
            text = 'empty';
        }

        // A word, not bullets: a screen reader reads each bullet of a mask.
        if (element.type === 'password') {
            text = '(masked)';
        }

        report.filled.push({ key, value: text });
    }

    return report;
}
