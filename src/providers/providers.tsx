"use client";

import { ReactNode } from "react";
import ThemeProvider from "./theme-provider";
import ToastProvider from "./toast-provider";

/**
 * Wraps the given children with theme and toast providers.
 *
 * @param children - React nodes to be rendered inside the providers.
 * @returns A React element tree that applies theme context (system-aware, class-based, with transitions disabled) and a toast context (3s timeout) to `children`.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ToastProvider timeout={3000}>{children}</ToastProvider>
    </ThemeProvider>
  );
}