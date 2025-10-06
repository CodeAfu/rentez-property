"use client";

import { ReactNode } from "react";
import ThemeProvider from "./theme-provider";
import ToastProvider from "./toast-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ToastProvider timeout={60000}>{children}</ToastProvider>
    </ThemeProvider>
  );
}
