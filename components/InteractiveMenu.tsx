"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MenuLink = {
  href: string;
  label: string;
};

export function InteractiveMenu({
  links,
  contactLabel,
  email,
  cvLabel,
  cvUrl,
}: {
  links: MenuLink[];
  contactLabel: string;
  email: string;
  cvLabel: string;
  cvUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, 360);
  };

  useEffect(() => cancelClose, []);

  return (
    <div
      ref={menuRef}
      className={`mobile-menu ${open ? "is-open" : ""}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          cancelClose();
          setOpen(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") scheduleClose();
      }}
      onBlur={(event) => {
        if (!menuRef.current?.contains(event.relatedTarget as Node | null)) {
          cancelClose();
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          cancelClose();
          setOpen(false);
          menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
        }
      }}
    >
      <button
        className="mobile-menu-trigger"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation-panel"
        onClick={() => {
          cancelClose();
          setOpen((current) => !current);
        }}
      >
        <span />
        <span />
        <span />
      </button>
      <div
        id="mobile-navigation-panel"
        className="mobile-menu-panel"
        aria-hidden={!open}
      >
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => {
              cancelClose();
              setOpen(false);
            }}
          >
            {item.label}
          </Link>
        ))}
        <a
          href={`mailto:${email}`}
          onClick={() => {
            cancelClose();
            setOpen(false);
          }}
        >
          {contactLabel}
        </a>
        <a
          className="mobile-menu-cv"
          href={cvUrl}
          download
          onClick={() => {
            cancelClose();
            setOpen(false);
          }}
        >
          <span>{cvLabel}</span>
          <small>PDF</small>
        </a>
      </div>
    </div>
  );
}
