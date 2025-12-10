"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { LoginFormData, loginSchema } from "@/types/user";
import { useAuth } from "@/providers/auth-provider";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const {
    loginMutation: { mutate: login, isPending, error, isError },
  } = useAuth();

  const onSubmit = (data: LoginFormData) => {
    login(data);
    queryClient.invalidateQueries({ queryKey: ["property", "u"] })
  };

  const getErrorMessage = () => {
    if (!error) return "";
    if (axios.isAxiosError(error)) {
      const backend = error.response?.data || {};
      const devEnv = process.env.NODE_ENV === "development";
      return devEnv
        ? backend.error || "Unknown Error"
        : backend.message || "Login failed";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div>
          <label className="ml-1 select-none text-sm">Email Address:</label>
          <Input {...register("email")} placeholder="Enter email address" />
          {errors.email && (
            <p className="ml-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="ml-1 select-none text-sm">Password:</label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="ml-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button disabled={isPending} type="submit">
          {isPending ? "Logging in..." : "Login"}
        </Button>
        {isError && <p className="text-sm text-red-500">{getErrorMessage()}</p>}
      </div>
    </form>
  );
}
