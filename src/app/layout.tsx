import type { Metadata } from "next";
import { ThemeProvider } from "@/theme-provider";
import { cn } from "@/lib/utils";
import { Space_Grotesk, Merriweather } from "next/font/google";

import "./globals.css";
import { ToggleTheme } from "@/components/toggle-theme";
import Navbar from "./_nav/_components/navbar";
import Footer from "./_components/footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "RentEZ Property",
  description: "Simplifying property management for landlords and tenants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased",
          spaceGrotesk.variable,
          merriweather.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <ToggleTheme />
        </ThemeProvider>
      </body>
    </html>
  );
}
