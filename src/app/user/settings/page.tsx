import { Suspense } from "react";
import SettingsLayout from "./_components/settings-layout";

export default function SettingsPage() {
  return (
    <div className="w-full px-2 mx-auto max-w-7xl h-[calc(100dvh-4rem)]">
      <Suspense>
        <SettingsLayout />
      </Suspense>
    </div>
  );
}
