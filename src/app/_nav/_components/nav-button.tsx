"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink } from "@/types/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes, useState, useRef } from "react";

interface NavButtonProps extends HTMLAttributes<HTMLButtonElement> {
  route: NavLink;
}

export default function NavButton({ route, ...props }: NavButtonProps) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Button
      asChild
      key={route.href}
      variant="ghost"
      className={cn(
        "h-full rounded-none font-semibold text-base border-b border-b-transparent relative overflow-hidden hover:bg-transparent text-gray-700 ",
        route.href === pathname && "border-b-accent"
      )}
      {...props}
    >
      <Link 
        href={route.href}
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Expanding circle */}
        <span
          className={cn(
            "absolute rounded-full bg-accent/20 pointer-events-none transition-all duration-500 ease-out",
            isHovered ? "scale-[4]" : "scale-0"
          )}
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: '20px',
            height: '20px',
            transform: `translate(-50%, -50%) scale(${isHovered ? 4 : 0})`,
          }}
        />
        <span className="relative z-10">{route.label}</span>
      </Link>
    </Button>
  );
}
