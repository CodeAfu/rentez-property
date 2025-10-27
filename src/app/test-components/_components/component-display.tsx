"use client";

import { ReactNode, useState } from "react";

interface ComponentDisplayProps {
  title: string;
  display?: boolean;
  children: ReactNode;
}

export default function ComponentDisplay({
  title,
  display = false,
  children,
}: ComponentDisplayProps) {
  const [isOpen, setIsOpen] = useState(display);
  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-8 py-4 my-4 rounded cursor-pointer bg-card mb-2 font-bold shadow
                    flex w-full items-center justify-between
                    hover:bg-accent hover:text-accent-foreground transition duration-200"
      >
        <span className="text-xl">{title}</span>
        <span className="text-2xl font-light">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && children}
    </div>
  );
}
