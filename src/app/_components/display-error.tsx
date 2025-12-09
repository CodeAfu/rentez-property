import { AlertCircle } from "lucide-react";

interface DisplayErrorProps {
  title?: string;
  message: string;
}

export default function DisplayError({ title = "Error", message }: DisplayErrorProps) {
  return (
    <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-center shadow-sm">
      <div className="mb-3 rounded-full bg-destructive/20 p-3">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h2 className="mb-2 text-lg font-semibold text-destructive">{title}</h2>
      <p className="text-sm text-destructive font-extralight">{message}</p>
    </div>
  );
}
