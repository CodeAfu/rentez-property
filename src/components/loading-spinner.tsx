import React from "react";

interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({ text }: LoadingSpinnerProps) {
  return (
    <div className="h-full flex flex-col gap-2 items-center justify-center">
      <div className="size-12 rounded-full border-4 border-gray-100 border-t-primary animate-spin" />
      <h4 className="text-sm font-extralight text-muted-foreground">{text}</h4>
    </div>
  );
}
