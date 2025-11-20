import { ReactNode } from "react";
import Overview from "./_components/_tabs/overview";
import Test from "./_components/_tabs/test";
import ViewUserProperty from "./_components/_tabs/view-user-property";

interface Tab {
  label: string;
  node: ReactNode;
}

export const tabs: Record<string, Tab> = {
  overview: { label: "Overview", node: <Overview /> },
  property: { label: "Property", node: <ViewUserProperty /> },
  test: { label: "Test", node: <Test /> },
};
