import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router doesn't reset scroll position on navigation by default.
 * On route change with no hash, scroll to the top of the page.
 * On route change with a hash (e.g. /recipes#ai-generator-heading),
 * wait a tick for the new route to mount, then scroll the target into view.
 */
export default function ScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.slice(1);
            const tryScroll = () => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return true;
                }
                return false;
            };
            if (!tryScroll()) {
                const t = window.setTimeout(tryScroll, 80);
                return () => window.clearTimeout(t);
            }
            return;
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname, hash]);

    return null;
}
