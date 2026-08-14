"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    let safetyTimer = 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const reveal = (element: Element) => element.classList.add("is-visible");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    const register = (root: ParentNode) => {
      const elements: HTMLElement[] = [];
      if (root instanceof HTMLElement && root.matches("[data-reveal]")) {
        elements.push(root);
      }
      elements.push(
        ...Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]")),
      );

      elements.forEach((element) => {
        if (reducedMotion) reveal(element);
        else observer.observe(element);
      });
    };

    frame = window.requestAnimationFrame(() => register(document));

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) register(node);
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // If a browser restores the previous scroll position before the observer
    // reports intersections, never leave content inside the viewport hidden.
    safetyTimer = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
          reveal(element);
          observer.unobserve(element);
        }
      });
    }, 500);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(safetyTimer);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
