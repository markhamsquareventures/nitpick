// Every key has the prefix "nitpick.". A storage can throw (a private window, blocked site
// data), so each access has a fallback and the panel works without storage.

function read(storage, key, fallback) {
    try {
        return JSON.parse(storage.getItem(`nitpick.${key}`)) ?? fallback;
    } catch {
        return fallback;
    }
}

function write(storage, key, value) {
    try {
        if (value === null) {
            storage.removeItem(`nitpick.${key}`);

            return;
        }

        storage.setItem(`nitpick.${key}`, JSON.stringify(value));
    } catch {
        // The value then lasts for this page only.
    }
}

export const local = {
    read: (key, fallback) => read(localStorage, key, fallback),
    write: (key, value) => write(localStorage, key, value),
};

export const session = {
    read: (key, fallback) => read(sessionStorage, key, fallback),
    write: (key, value) => write(sessionStorage, key, value),
};

/** Opens the path. On the new page, the panel gives the focus back to the control with this focus key. */
export function openWithFocus(focusKey, path) {
    session.write('focus', focusKey);
    location.assign(path);
}
