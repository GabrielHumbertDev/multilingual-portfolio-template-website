"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/content";

type Theme = "dark" | "light";

const labels = {
  en: {
    light: "Switch to light mode",
    dark: "Switch to dark mode",
    top: "Back to top",
  },
  es: {
    light: "Cambiar al modo claro",
    dark: "Cambiar al modo oscuro",
    top: "Volver arriba",
  },
  "pt-br": {
    light: "Mudar para o modo claro",
    dark: "Mudar para o modo escuro",
    top: "Voltar ao topo",
  },
} as const;

export function SiteControls({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme") as Theme | null;
    const preferred: Theme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    const initial = saved === "dark" || saved === "light" ? saved : preferred;
    setTheme(initial);
    document.documentElement.dataset.theme = initial;

    const onScroll = () => setShowTop(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("portfolio-theme", next);
  };

  return (
    <>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? labels[locale].light : labels[locale].dark}
        title={theme === "dark" ? labels[locale].light : labels[locale].dark}
      >
        <span className="theme-duet" aria-hidden="true">
          <span className="theme-moon" />
          <span className="theme-sun" />
        </span>
      </button>
      <button
        type="button"
        className={`back-to-top${showTop ? " is-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={labels[locale].top}
        title={labels[locale].top}
        tabIndex={showTop ? 0 : -1}
      >
        <span aria-hidden="true">↑</span>
        <small>{labels[locale].top}</small>
      </button>
    </>
  );
}
