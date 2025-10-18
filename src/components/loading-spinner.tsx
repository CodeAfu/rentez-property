import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="size-12 rounded-full border-4 border-gray-100 border-t-primary animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
