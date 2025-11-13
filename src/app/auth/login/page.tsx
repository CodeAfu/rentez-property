"use client";

import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center px-2">
      <div className="w-full max-w-4xl flex flex-col gap-4 p-12 py-16 bg-card rounded shadow">
        <div className="flex justify-between">
          <h1 className="font-bold select-none text-2xl mb-4">Login</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
