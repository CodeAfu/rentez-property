import Overview from "./_components/_tabs/overview";
import ViewUserProperty from "./_components/_tabs/view-user-property";

interface Tab {
  label: string;
  node: React.ReactNode;
}

export const tabs: Record<string, Tab> = {
  overview: { label: "Overview", node: <Overview /> },
  property: { label: "Property", node: <ViewUserProperty /> },
};
