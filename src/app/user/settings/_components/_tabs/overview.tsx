"use client";

import { Fragment, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/loading-spinner";
import { getCurrentUserOptions } from "../../query";

const info: Info[] = [
  { label: "First Name:" },
  { label: "Last Name:" },
  { label: "Email:" },
  { label: "Ethnicity:" },
];

interface Info {
  label: string;
}

function InputField({ item }: { item: Info }) {
  const searchParams = useSearchParams();
  const [editMode, setEditMode] = useState(
    () => searchParams.get("editMode") === "true",
  );

  return (
    <Fragment>
      <label className="text-nowrap text-muted-foreground text-sm">
        {item.label}
      </label>
      <div className="flex gap-2 items-center">
        <Input disabled={!editMode} className="w-full disabled:bg-muted" />
        <button
          className="size-4 text-primary"
          onClick={() => setEditMode((prev) => !prev)}
        >
          <Edit className="size-4" />
        </button>
      </div>
    </Fragment>
  );
}

export default function Overview() {
  const {
    data: userData,
    isPending,
    isLoading,
    error,
    isError,
  } = useQuery(getCurrentUserOptions());

  if (isPending || isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div className="text-red-500">{error.message}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl mb-4">Overview</h2>
        <button className="text-sm border-primary bg-muted px-4 py-1 shadow rounded">
          Edit
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          {info.map((item) => (
            <InputField item={item} key={item.label} />
          ))}
        </div>
      </div>
      <p className="text-xs font-light text-gray-900 pt-4">
        {JSON.stringify(userData.data, null, 2)}
      </p>
    </div>
  );
}
