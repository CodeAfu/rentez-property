"use client";

import { Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserOptions } from "../../query";
import LoadingSpinner from "@/components/loading-spinner";

interface Info {
  label: string;
  data: string | null;
}

function InputField({ item, editMode }: { item: Info; editMode: boolean }) {
  return (
    <Fragment>
      <label className="text-nowrap text-muted-foreground text-sm">
        {item.label}
      </label>
      <div className="flex gap-2 items-center">
        <Input
          disabled={!editMode}
          className="w-full disabled:bg-muted"
          defaultValue={item.data || ""}
        />
      </div>
    </Fragment>
  );
}

export default function Overview() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Single source of truth
  const editMode = searchParams.get("editMode") === "true";

  const {
    data: userData,
    isPending,
    isLoading,
    error,
    isError,
  } = useQuery(getCurrentUserOptions());

  const setEditMode = (value: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("editMode", "true");
    } else {
      params.delete("editMode");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const saveEditChanges = () => {
    try {
      // Your save logic here
    } catch (err) {
      console.error(err);
    } finally {
      setEditMode(false);
    }
  };

  const info: Info[] = [
    { label: "First Name:", data: userData?.data.firstName },
    { label: "Last Name:", data: userData?.data.lastName },
    { label: "Occupation:", data: userData?.data.occupation },
    { label: "Ethnicity", data: userData?.data.ethnicity },
    { label: "Date of Birth:", data: userData?.data.dateOfBirth },
  ];

  if (isPending || isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div className="text-red-500">{error.message}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-primary text-2xl mb-8">Overview</h2>
        <button
          onClick={() => setEditMode(true)}
          disabled={editMode}
          className="text-sm border-border bg-card text-primary px-4 py-1 shadow rounded cursor-pointer
              hover:bg-accent/10 transition duration-200
              disabled:opacity-50 disabled:pointer-events-none"
        >
          Edit
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          {info.map((item) => (
            <InputField item={item} key={item.label} editMode={editMode} />
          ))}
        </div>
      </div>
      {editMode && (
        <div className="mt-8 flex flex-row-reverse gap-2 items-center">
          <button
            onClick={saveEditChanges}
            className="text-sm border-border bg-primary text-primary-foreground px-4 py-1 shadow rounded 
              hover:bg-accent transition duration-200"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="text-sm border-border bg-card text-primary px-4 py-1 shadow rounded 
              hover:bg-accent/10 transition duration-200"
          >
            Cancel
          </button>
        </div>
      )}

      <p className="text-xs font-light text-gray-900 pt-4">
        {JSON.stringify(userData.data, null, 2)}
      </p>
    </div>
  );
}
