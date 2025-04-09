
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const AnimatedLoader = ({
  size = "md",
  className,
}: AnimatedLoaderProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={cn(
        "relative inline-block animate-spin rounded-full border-solid border-current border-t-transparent text-primary",
        sizeClasses[size],
        className
      )}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default AnimatedLoader;
