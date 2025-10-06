"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";

type Type = "info" | "warning" | "error" | "log";

interface Toast {
  id: string;
  message: string;
  type: Type;
  timeout?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

interface ToastProviderProps {
  children: ReactNode;
  timeout?: number;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({
  children,
  timeout = 3000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = ({
    message,
    type,
    timeout: customTimeout,
  }: Omit<Toast, "id">) => {
    const id = uuidv4();
    setToasts((prevState) => [
      { id, message, type, timeout: customTimeout },
      ...prevState,
    ]);
    const expireTime = customTimeout || timeout;
    setTimeout(() => removeToast(id), expireTime);
  };

  const removeToast = (id: string) => {
    setToasts((prevState) => prevState.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {createPortal(
        // Change to Toast Component
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
          {toasts.map((toast) => (
            <div key={toast.id} className="bg-white p-4 rounded shadow-lg">
              {toast.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
