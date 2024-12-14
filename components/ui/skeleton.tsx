"use client";

import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200/80 dark:bg-[#1e1e1e]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };