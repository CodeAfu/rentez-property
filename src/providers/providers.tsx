"use client";

import { ReactNode } from "react";
import ThemeProvider from "./theme-provider";
import ToastProvider from "./toast-provider";
import QueryProvider from "./query-provider";
import { AuthProvider } from "./auth-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <ToastProvider timeout={5000}>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
