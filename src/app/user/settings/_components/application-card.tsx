"use client";

import api from "@/lib/api";
import { withAuth } from "@/lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, ExternalLink } from "lucide-react";
import { PropertyApplication } from "../types";
import { devLog, logApiErr } from "@/lib/utils";
import { useState } from "react";
import Modal from "@/components/modal";
import Link from "next/link";
import { useToast } from "@/providers/toast-provider";

const deleteApplication = withAuth(async (id: string) => {
  const response = await api.delete(`/api/propertyapplications/${id}`);
  return response.data;
});

export function ApplicationCard({ application }: { application: PropertyApplication }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteApplication(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["propertyapplications", "my-applications"],
      });
      devLog("Deleted", data);
      toast({
        title: "Application deleted",
        message: "Your application has been deleted.",
      })
      setIsDeleteModalOpen(false);
    },
    onError: (err) => {
      logApiErr(err);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(application.id);
  };

  return (
    <>
      <div className="border border-border rounded-lg p-4 space-y-3 hover:border-primary transition bg-card">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground">{application.propertyTitle}</h3>
            <p className="text-xs text-muted-foreground">{application.propertyAddress}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/property/${application.propertyId}`}
              className="text-primary hover:text-primary/80 transition"
            >
              <ExternalLink className="size-5" />
            </Link>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              disabled={deleteMutation.isPending}
              className="text-destructive hover:text-destructive/80 hover:cursor-pointer disabled:opacity-50 transition"
            >
              <Trash2 className="size-5 " />
            </button>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Applied: {new Date(application.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <Modal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Delete Application</h3>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete your application for{" "}
            <span className="font-medium text-foreground">{application.propertyTitle}</span>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 text-sm border border-border rounded hover:bg-accent transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 text-sm bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 disabled:opacity-50 transition"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
