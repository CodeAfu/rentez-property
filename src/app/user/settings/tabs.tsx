import { ReactNode } from "react";
import Overview from "./_components/overview";
import Test from "./_components/test";

interface Tab {
  label: string;
  node: ReactNode;
}

export const tabs: Record<string, Tab> = {
  overview: { label: "Overview", node: <Overview /> },
  test: { label: "Test", node: <Test /> },
};
