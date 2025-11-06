import { cn } from "@/lib/utils";
import { ToastMessageType } from "@/types/toast";
import { AlertTriangle, CircleX, FileText, Info } from "lucide-react";
import React, { HTMLAttributes } from "react";
// import { Button } from "./ui/button";
// import {
//   TOAST_ENTRY_ANIMATION_DURATION,
//   TOAST_EXIT_ANIMATION_DURATION,
// } from "@/lib/consts";

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  type: ToastMessageType;
  isExiting?: boolean;
}

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
