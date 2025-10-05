"use client";

import { cn } from "@/lib/utils";
import React, {
  Dispatch,
  Fragment,
  HTMLAttributes,
  SetStateAction,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  width?: "sm" | "md" | "base" | "lg" | "xl";
}

export default function Modal({
  isOpen,
  onOpenChange,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      const bodyChildren = Array.from(document.body.children).filter(
        (child) => !child.hasAttribute("data-modal-content")
      );
      bodyChildren.map((child) => child.setAttribute("inert", ""));
      return () => {
        bodyChildren.map((child) => child.removeAttribute("inert"));
      };
    }
  }, [isOpen]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <Fragment>
      {isOpen && (
        <Fragment>
          <div
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm opacity-0 animate-[fadeIn_150ms_ease-out_forwards]"
            data-modal-content
          />
          <div
            id="modal-body"
            className={cn(
              "fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-card min-h-32 text-card-foreground flex flex-col rounded shadow w-full max-w-xl",
              "opacity-0 animate-[fadeIn_150ms_ease-out_forwards]",
              className
            )}
            data-modal-content
          >
            {children}
          </div>
        </Fragment>
      )}
    </Fragment>,
    document.body
  );
}
