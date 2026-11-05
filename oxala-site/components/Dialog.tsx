"use client";

import { useEffect, useRef } from "react";
import { LuX } from "react-icons/lu";

export default function Dialog({
  open,
  onClose,
  titleId,
  closeLabel,
  className = "",
  children,
}: {
  open: boolean;
  onClose: () => void;
  titleId: string;
  closeLabel: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`oxala-dialog ${className}`}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-panel">
        <button
          type="button"
          className="dialog-close"
          aria-label={closeLabel}
          onClick={onClose}
          autoFocus
        >
          <LuX aria-hidden />
        </button>
        {children}
      </div>
    </dialog>
  );
}
