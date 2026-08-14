"use client";

import { useRef } from "react";

type DegreeCertificateLightboxProps = {
  src: string;
  alt: string;
  label: string;
  closeLabel: string;
  hint: string;
  variant: "image" | "button";
};

export function DegreeCertificateLightbox({
  src,
  alt,
  label,
  closeLabel,
  hint,
  variant,
}: DegreeCertificateLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      {variant === "image" ? (
        <button className="degree-certificate-image" type="button" onClick={open} aria-label={label}>
          <img src={src} alt={alt} />
        </button>
      ) : (
        <button className="degree-certificate-action" type="button" onClick={open}>
          {label}
        </button>
      )}

      <dialog
        ref={dialogRef}
        className="certificate-lightbox"
        aria-label={label}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="certificate-lightbox-frame">
          <button className="certificate-lightbox-close" type="button" onClick={close} aria-label={closeLabel}>
            <span aria-hidden="true">×</span>
          </button>
          <button className="certificate-lightbox-document" type="button" onClick={close} aria-label={closeLabel}>
            <img src={src} alt={alt} />
          </button>
          <p>{hint}</p>
        </div>
      </dialog>
    </>
  );
}
