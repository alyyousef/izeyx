"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoWordmark } from "@/components/ui/LogoWordmark";
import { primaryNav, ctaCopy } from "@/lib/site-config";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Close the panel when navigation actually occurs. Adjusting state during
  // render (rather than in an effect) avoids an extra render + open-menu flash.
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setOpen(false);
  }

  // The overlay portals to document.body (see below) so it isn't clipped by
  // an ancestor that creates a new containing block, namely the header's
  // backdrop-filter does exactly that, which would otherwise shrink a
  // "fixed inset-0" panel down to the header's own height instead of the
  // full viewport. Portals require a DOM target, so this only renders once
  // mounted on the client. Client-only-after-hydration is, by definition,
  // not knowable during render (that's the SSR/client mismatch this guards
  // against), so there's no render-time alternative to this effect, unlike
  // the pathname adjustment above.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount detection has no render-time equivalent; see comment above.
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const opener = toggleButtonRef.current;
    const backgroundElements = Array.from(document.querySelectorAll<HTMLElement>("body > header, body > main, body > footer"));
    const previousInertValues = backgroundElements.map((element) => element.inert);

    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => {
      element.inert = true;
    });
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((element) => element.getClientRects().length > 0);

      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      backgroundElements.forEach((element, index) => {
        element.inert = previousInertValues[index];
      });
      document.removeEventListener("keydown", handleKeyDown);
      opener?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleButtonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-sm border border-border-strong px-3 text-sm font-medium text-foreground"
      >
        <span className="sr-only">Open menu</span>
        <span aria-hidden="true" className="flex flex-col gap-1.25">
          <span className="block h-[1.5px] w-5 bg-foreground" />
          <span className="block h-[1.5px] w-5 bg-foreground" />
        </span>
      </button>

      {open && mounted
        ? createPortal(
            <div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              tabIndex={-1}
              className="on-dark fixed inset-0 z-50 flex flex-col bg-background text-foreground"
            >
              <div className="flex items-center justify-between border-b border-border px-(--container-pad) py-5">
                <LogoWordmark onClick={() => setOpen(false)} />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-border-strong text-2xl leading-none"
                >
                  <span className="sr-only">Close menu</span>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-between overflow-y-auto px-(--container-pad) py-8">
                <ul className="flex flex-col gap-1">
                  {primaryNav.map((item) => (
                    <li key={item.href} className="border-b border-border">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-4 text-2xl font-sans font-medium tracking-tight"
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-8 flex min-h-11 items-center justify-center rounded-sm bg-primary px-6 py-4 text-base font-medium text-on-primary"
                >
                  {ctaCopy.primary}
                </Link>
              </nav>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
