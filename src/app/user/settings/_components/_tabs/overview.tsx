"use client";
import { Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpinner from "@/components/loading-spinner";
import { getCurrentUserOptions } from "@/queries/get-current-user-query";
import { EditUserRequest, editUserSchema } from "../../types";
import { editUserInfoOptions } from "@/queries/edit-current-user-query";
import { NULL_DATE_ENTRY } from "@/lib/consts";
import axios from "axios";
import { decodeToken } from "@/lib/auth";

interface Info {
  label: string;
  name: keyof EditUserRequest;
}

function InputField({
  item,
  editMode,
  register,
  error,
}: {
  item: Info;
  editMode: boolean;
  register: UseFormRegister<EditUserRequest>;
  error?: string;
}) {
  const isDateField = item.name == "dateOfBirth";
  return (
    <Fragment>
      <label className="text-nowrap text-muted-foreground text-sm">
        {item.label}
      </label>
      <div className="flex flex-col gap-1">
        <Input
          {...register(item.name)}
          type={isDateField ? "date" : "text"}
          disabled={!editMode}
          className="w-full disabled:bg-muted"
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </Fragment>
  );
}

export default function Overview() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const editMode = searchParams.get("editMode") === "true";

  const {
    data: userData,
    isPending,
    isLoading,
    error,
    isError,
  } = useQuery(getCurrentUserOptions());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserRequest>({
    resolver: zodResolver(editUserSchema),
    values: userData?.data
      ? {
        firstName: userData.data.firstName || "",
        lastName: userData.data.lastName || "",
        occupation: userData.data.occupation || "",
        ethnicity: userData.data.ethnicity || "",
        dateOfBirth:
          userData.data.dateOfBirth &&
            userData.data.dateOfBirth !== NULL_DATE_ENTRY
            ? userData.data.dateOfBirth.split("T")[0]
            : "",
      }
      : undefined,
  });

  const mutation = useMutation({
    ...editUserInfoOptions(userData?.data?.id || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users", "u", decodeToken("accessToken")],
      });
      setEditMode(false);
    },
  });

  const setEditMode = (value: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("editMode", "true");
    } else {
      params.delete("editMode");
      reset();
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const getMutationErrors = (error: Error) => {
    if (axios.isAxiosError(error)) {
      const errors = error.response?.data?.errors;
      if (errors) {
        return Object.entries(errors)
          .map(
            ([field, messages]) =>
              `${field}: ${(messages as string[]).join(", ")}`,
          )
          .join("; ");
      }
    }
  };

  const onSubmit = (data: EditUserRequest) => {
    if (!userData?.data?.id) return;
    mutation.mutate(data);
  };

  const info: Info[] = [
    { label: "First Name:", name: "firstName" },
    { label: "Last Name:", name: "lastName" },
    { label: "Occupation:", name: "occupation" },
    { label: "Ethnicity:", name: "ethnicity" },
    { label: "Date of Birth:", name: "dateOfBirth" },
  ];

  if (isPending || isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div className="text-red-500">{error.message}</div>;
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-primary text-xl mb-8">Overview</h2>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[auto_1fr] items-center gap-2">
            {info.map((item) => (
              <InputField
                item={item}
                key={item.name}
                editMode={editMode}
                register={register}
                error={errors[item.name]?.message}
              />
            ))}
          </div>
        </div>
        {editMode && (
          <div className="flex justify-between gap-4 mt-8">
            <p className="text-red-500 text-xs pt-4">
              {mutation.isError && getMutationErrors(mutation.error)}
            </p>

            <div className="flex flex-row-reverse gap-2 items-center">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="text-sm border-border bg-primary text-primary-foreground px-4 py-1 shadow rounded 
                hover:bg-accent transition duration-200 disabled:opacity-50"
              >
                {mutation.isPending ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                disabled={mutation.isPending}
                className="text-sm border-border bg-card text-primary px-4 py-1 shadow rounded 
                hover:bg-accent/10 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
