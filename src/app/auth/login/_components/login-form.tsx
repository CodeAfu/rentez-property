"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/providers/toast-provider";
import { access } from "fs";

const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const login = async (data: LoginFormData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
    data
  );
  return response;
};

export default function LoginForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    mutate: loginMutation,
    isError,
    isPending,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { accessToken } = data.data;
      localStorage.setItem("accessToken", accessToken);
      console.log(data);
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

  const onSubmit = (data: LoginFormData) => {
    loginMutation(data);
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
        {isError && <p className="text-sm text-red-500">Login Failed</p>}
      </div>
    </form>
  );
}
