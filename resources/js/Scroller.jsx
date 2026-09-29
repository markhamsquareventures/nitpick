import { useLayoutEffect, useRef } from 'preact/hooks';
import { session } from './storage.js';

/**
 * The scroll container of one tab. Its scroll position is kept in sessionStorage, so a reload
 * (a login, a reset) opens the tab at the same place. The content stays hidden until its data is
 * loaded; the layout effect then sets the position and shows it in the same frame, so the tester
 * never sees a jump. After the restore, the focus goes back to the control that reloaded the page.
 */
export function Scroller({ name, ready, children }) {
    const element = useRef(null);
    const restored = useRef(false);

    useLayoutEffect(() => {
        if (!ready || restored.current) {
            return;
        }

        restored.current = true;
        element.current.scrollTop = session.read(`scroll.${name}`, 0);

        const focusKey = session.read('focus', null);

        if (focusKey === null) {
            return;
        }

        session.write('focus', null);
        const root = element.current.getRootNode();
        root.querySelector(`[data-focus-key="${CSS.escape(focusKey)}"]`)?.focus({ preventScroll: true });

        // A login disables that persona's button ("Current"), so the selected tab takes the focus.
        if (!root.activeElement) {
            root.querySelector('[role="tab"][aria-selected="true"]')?.focus({ preventScroll: true });
        }
    }, [ready]);

    // The browser queues a scroll event and fires it later, not in the same tick as the scroll.
    // A tab switch, a card close, or a body swap can unmount this Scroller in between, which nulls
    // the ref; the queued event still fires on the detached node, so this checks the ref too.
    const onScroll = () => {
        if (restored.current && element.current) {
            session.write(`scroll.${name}`, element.current.scrollTop);
        }
    };

    return (
        <div ref={element} class="scroller" data-ready={ready} onScroll={onScroll}>
            {children}
        </div>
    );
}
