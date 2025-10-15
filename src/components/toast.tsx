import { cn } from "@/lib/utils";
import { ToastMessageType } from "@/types/toast";
import { AlertTriangle, CircleX, FileText, Info, X } from "lucide-react";
import React, { HTMLAttributes } from "react";
import { Button } from "./ui/button";
import {
  TOAST_ENTRY_ANIMATION_DURATION,
  TOAST_EXIT_ANIMATION_DURATION,
} from "@/lib/consts";

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  type: ToastMessageType;
  isExiting?: boolean;
}

/**
 * Renders a toast UI element that displays an icon for the message type, an optional title, and a message.
 *
 * @param title - Optional heading shown above the message
 * @param message - The main text content of the toast
 * @param type - The toast message type which selects the icon (e.g., "info", "warning", "error", "log")
 * @param className - Optional additional CSS class names applied to the root element
 * @param isExiting - When true, applies the exit animation class; otherwise applies the enter animation class
 * @param props - Additional HTML attributes forwarded to the root div
 * @returns The rendered toast element
 */
export default function Toast({
  title,
  message,
  type,
  className,
  isExiting = false,
  ...props
}: ToastProps) {
  return (
    <div
      className={cn(
        "relative md:w-sm w-64 opacity-90 font-mono bg-secondary text-secondary-foreground stroke-secondary-foreground shadow-lg p-2 rounded text-sm flex gap-2",
        isExiting ? "animate-toast-exit" : "animate-toast-enter",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="size-12 rounded-full flex items-center justify-center overflow-hidden">
          {renderTypeIcon(type)}
        </div>
      </div>
      <div className="w-full min-w-0">
        {title && (
          <h1 className="text-base font-semibold mb-1 truncate">{title}</h1>
        )}
        <p className="break-words">{message}</p>
      </div>
      {/* <Button onClick={} variant="ghost"> */}
      {/* <X /> */}
      {/* </Button> */}
    </div>
  );
}

function renderTypeIcon(toastMessageType: ToastMessageType) {
  switch (toastMessageType) {
    case "info":
      return <Info className="w-8 h-8" />;
    case "warning":
      return <AlertTriangle className="w-8 h-8" />;
    case "error":
      return <CircleX className="w-8 h-8" />;
    case "log":
      return <FileText className="w-8 h-8" />;
  }
}