"use client";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { logApiErr } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { useToast } from "@/providers/toast-provider";
import { useMutation } from "@tanstack/react-query";
import { BellRing, Loader2 } from "lucide-react";
import { SetStateAction } from "react";

interface NotificationConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (value: SetStateAction<boolean>) => void;
}

export default function NotificationConfirmationModal({ isOpen, onOpenChange }: NotificationConfirmationModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  const { mutate: subscribeToNotifications, isPending } = useMutation({
    mutationFn: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!user) throw new Error("User not found. Please try again after refreshing the page.");
      if (process.env.NODE_ENV === "development") throw new Error("Use only in production (Vercel depoloyment)");
      return (await api.post("/api/users/subscribe", { email: user.email })).data;
    },
    onSuccess: () => {
      onOpenChange(false);
      toast({
        type: "info",
        title: "Success",
        message: "You have successfully subscribed to notifications.",
      })
    },
    onError: (err) => {
      onOpenChange(false);
      logApiErr(err);
      toast({
        type: "error",
        title: "Error",
        message: "Failed to subscribe to notifications. Please try again.",
      })
    },
  });

  return (
    <Modal
      className="p-0 overflow-hidden shadow-lg"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Confirm Notification Subscription"
    >
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="rounded-full bg-primary/10 p-4 mb-4 ring-1 ring-primary/20">
          <BellRing className="size-8 text-primary" />
        </div>

        <h2 className="text-xl font-semibold tracking-tight mb-2">
          Stay Updated
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          You will receive email notifications whenever a user uploads a new property.
        </p>

        <div className="flex flex-col w-full gap-2 mb-4">
          <Button
            className="w-full"
            variant="default"
            disabled={isPending}
            onClick={() => subscribeToNotifications()}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
        <p className="text-sm text-destructive">
          Friendly reminder: Please ensure that <strong>your account is registered with your personal email address</strong>{" "}
          before subscribing to notifications. This actually sends real emails and we don&apos;t want to spam a poor stranger out there.
        </p>
      </div>
    </Modal>
  );
}
