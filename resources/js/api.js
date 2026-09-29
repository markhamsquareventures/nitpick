// The script tag's src is {app}/nitpick/panel.js, so the JSON API is next to it.
const base = new URL('.', document.currentScript.src);

export class ApiError extends Error {
    constructor(status, data) {
        super(data.message ?? `The request failed with status ${status}.`);
        this.data = data;
    }
}

function xsrfToken() {
    const match = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);

    return match ? decodeURIComponent(match[1]) : '';
}

export function url(path) {
    return new URL(path, base).toString();
}

export async function request(path, { method = 'GET', body } = {}) {
    const response = await fetch(url(path), {
        method,
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfToken(),
        },
        body: body && JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new ApiError(response.status, data);
    }

    return data;
}

/** The first validation error when there is one (a 422), else the response message. */
export function errorMessage(error) {
    const errors = Object.values(error.data?.errors ?? {});

    if (errors.length > 0) {
        return errors[0][0];
    }

    return error.message;
}
