export type ToastMessageType = "info" | "warning" | "error" | "log";

export interface ToastType {
  id: string;
  title: string;
  type?: ToastMessageType;
  message: string;
}
