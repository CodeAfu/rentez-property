"use client";

import React, { useState } from "react";
import { Upload, File } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DocumentSubmit() {
  const [fileName, setFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <form className="flex flex-col items-center w-full max-w-md mx-auto">
      <label
        htmlFor="file-upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "group flex flex-col items-center justify-center w-full h-64",
          "border-2 border-dashed rounded-lg cursor-pointer",
          "transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-accent/10"
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
          <p className="mb-2 text-sm text-muted-foreground">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-muted-foreground">
            PDF Document
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx"
        />
      </label>
      {fileName && (
        <div className="flex items-center gap-2 mt-4 p-3 bg-accent rounded-md w-full">
          <File className="w-4 h-4 text-primary" />
          <span className="text-sm truncate">{fileName}</span>
        </div>
      )}
    </form>
  );
}
