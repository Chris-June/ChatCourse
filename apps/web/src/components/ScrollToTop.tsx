import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top on route changes.
 * - Window scroll
 * - Any element with [data-scroll-container]
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Defer until after route renders so containers exist
    const id = requestAnimationFrame(() => {
      // Window
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      // Marked containers
      const nodes = document.querySelectorAll<HTMLElement>('[data-scroll-container]');
      nodes.forEach((el) => {
        try {
          el.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        } catch {
          // fallback if scrollTo not supported
          el.scrollTop = 0;
          el.scrollLeft = 0;
        }
      });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, search]);

  return null;
}
