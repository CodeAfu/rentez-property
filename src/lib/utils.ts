import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function devLog(...args: unknown[]): void {
  if (process.env.NODE_ENV === "development") console.log(...args);
}

export function jsonLog(arg1: unknown, arg2?: unknown): void {
  if (process.env.NODE_ENV !== "development") return;
  if (arg2 === undefined) {
    console.log(`[${JSON.stringify(arg1, null, 2)}]`);
  } else {
    console.log(`${arg1}\n[${JSON.stringify(arg2, null, 2)}]`);
  }
}

export function devOut<T>(inputs: T): T | undefined {
  if (process.env.NODE_ENV === "development") return inputs;
}

export function logApiErr(err: Error): void {
  if (process.env.NODE_ENV !== "development") return;
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      console.error(err);
      return;
    }
    console.error(err.response.data.errors)
  } else {
    console.error(err.message);
  };
}
