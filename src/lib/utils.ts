import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function devLog(...args: unknown[]): void {
  if (process.env.NODE_ENV === "development") console.log(...args);
}

export function devOut<T>(inputs: T): T | undefined {
  if (process.env.NODE_ENV === "development") return inputs;
}
