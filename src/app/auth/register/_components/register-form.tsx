"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { useToast } from "@/providers/toast-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const registerSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const registerApi = async (data: RegisterFormData) => {
  const response = await api.post("/api/auth/register", data);
  return response;
};

export default function RegisterForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const {
    mutate: registerMutation,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const devEnv = process.env.NODE_ENV === "development";
        const backendData = error.response?.data || {};
        const message = devEnv ? backendData.error : backendData.message;

        console.error("Login Error:", message);

        toast({
          type: "error",
          title: "Error",
          message,
        });
      } else {
        console.error("Unexpected Error:", error);
      }
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation(data);
  };

  const getErrorMessage = () => {
    if (!error) return "";
    if (axios.isAxiosError(error)) {
      const backend = error.response?.data || {};
      const devEnv = process.env.NODE_ENV === "development";
      return devEnv
        ? backend.error || "Unknown Error"
        : backend.message || "Something went wrong";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div>
          <label className="ml-1 select-none text-sm" htmlFor="email">
            Email
          </label>
          <Input {...register("email")} />
          {errors.email && (
            <p className="ml-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="ml-1 select-none text-sm" htmlFor="password">
            Password
          </label>
          <Input {...register("password")} type="password" />
          {errors.password && (
            <p className="ml-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button disabled={isPending} type="submit">
          {isPending ? "..." : "Register"}
        </Button>
        {isError && <p className="text-sm text-red-500">{getErrorMessage()}</p>}
      </div>
    </form>
  );
}
