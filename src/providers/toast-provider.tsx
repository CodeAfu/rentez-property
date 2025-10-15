"use client";
import Toast from "@/components/toast";
import { TOAST_EXIT_ANIMATION_DURATION } from "@/lib/consts";
import { ToastType } from "@/types/toast";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
interface ToastContextType {
  toast: (toast: Omit<ToastType, "id">) => void;
}
interface ToastProviderProps {
  children: ReactNode;
  timeout?: number;
}

interface ToastWithState extends Required<ToastType> {
  isExiting: boolean;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({
  children,
  timeout = 5000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Required<ToastWithState>[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toast = ({ type = "info", title, message }: Omit<ToastType, "id">) => {
    const id = uuidv4();
    setToasts((prevState) => [
      { id, type, title, message, timeout, isExiting: false },
      ...prevState,
    ]);

    setTimeout(() => removeToast(id), timeout);
  };

  const removeToast = (id: string) => {
    // Trigger exit animation
    setToasts((prevState) =>
      prevState.map((toast) =>
        toast.id === id ? { ...toast, isExiting: true } : toast
      )
    );
    // Remove from state after animation completes
    setTimeout(() => {
      setToasts((prevState) => prevState.filter((toast) => toast.id !== id));
    }, TOAST_EXIT_ANIMATION_DURATION - 5);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {mounted &&
        createPortal(
          <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                title={toast.title}
                type={toast.type}
                message={toast.message}
                isExiting={toast.isExiting}
              />
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
