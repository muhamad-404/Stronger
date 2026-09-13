import { useEffect, useState } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Focus trap, Escape to close, restore focus, and lock body scroll for dialogs.
 * @param {{
 *   open: boolean,
 *   onClose?: () => void,
 *   panelRef: React.RefObject<HTMLElement | null>,
 *   initialFocusRef?: React.RefObject<HTMLElement | null>,
 *   enabled?: boolean,
 * }} options
 */
export function useDialogA11y({
  open,
  onClose,
  panelRef,
  initialFocusRef,
  enabled = true,
}) {
  useEffect(() => {
    if (!open || !enabled) return undefined;

    const panel = panelRef.current;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const getFocusable = () =>
      panel
        ? Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
            (el) =>
              el instanceof HTMLElement &&
              !el.hasAttribute('disabled') &&
              el.getAttribute('aria-hidden') !== 'true',
          )
        : [];

    const focusInitial = () => {
      const preferred = initialFocusRef?.current;
      if (preferred && typeof preferred.focus === 'function') {
        preferred.focus();
        return;
      }
      const items = getFocusable();
      if (items[0]) {
        items[0].focus();
        return;
      }
      if (panel) {
        panel.setAttribute('tabindex', '-1');
        panel.focus();
      }
    };

    const focusTimer = window.setTimeout(focusInitial, 0);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose?.();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;

      const items = getFocusable();
      if (!items.length) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (active instanceof Node && !panel.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [open, onClose, panelRef, initialFocusRef, enabled]);
}

/**
 * @returns {boolean}
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
