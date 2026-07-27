"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Toggles the "on-dark" class on the sticky <header> itself while a dark
 * section (marked data-header-zone="dark") sits directly beneath it, so the
 * header's own colors adapt instead of rendering a light bar over a black
 * section. Reuses the existing .on-dark token cascade, so no separate dark
 * header styles to maintain. Renders nothing.
 *
 * Re-scans on pathname change: the root layout (and this component) persists
 * across client-side navigations, but each page has dark zones in different
 * DOM positions, so the observed target set has to be rebuilt per route.
 */
export function HeaderToneWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    header.classList.remove("on-dark");
    const targets = document.querySelectorAll('[data-header-zone="dark"]');
    let observer: IntersectionObserver | undefined;
    let animationFrame = 0;

    const createObserver = () => {
      observer?.disconnect();
      header.classList.remove("on-dark");

      const headerHeight = header.getBoundingClientRect().height || 72;
      const intersecting = new Set<Element>();

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              intersecting.add(entry.target);
            } else {
              intersecting.delete(entry.target);
            }
          }
          header.classList.toggle("on-dark", intersecting.size > 0);
        },
        {
          // A one-pixel detection line positioned just below the header, so
          // "intersecting" means "this dark section is currently behind the header."
          rootMargin: `-${headerHeight}px 0px -${Math.max(window.innerHeight - headerHeight - 1, 0)}px 0px`,
          threshold: 0,
        }
      );

      targets.forEach((target) => observer?.observe(target));
    };

    const scheduleObserver = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(createObserver);
    };

    createObserver();
    const resizeObserver = new ResizeObserver(scheduleObserver);
    resizeObserver.observe(header);
    window.addEventListener("resize", scheduleObserver);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", scheduleObserver);
      resizeObserver.disconnect();
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
