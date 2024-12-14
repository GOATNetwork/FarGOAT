"use client";

import React, { useState } from "react";
import { Search, Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onCommandClick?: () => void;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, onCommandClick, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className={cn("relative w-full max-w-full", className)}>
        <div
          className={cn(
            "relative flex items-center w-full rounded-2xl",
            "bg-gray-100 dark:bg-gray-900/90 dark:bg-[#121212]",
            "ring-1 ring-gray-800 dark:ring-gray-700",
            "transition-all duration-200",
            isFocused && "ring-gray-700 dark:ring-gray-600"
          )}
        >
          <Search
            className="absolute left-4 h-4 w-4 text-gray-500"
            aria-hidden="true"
          />
          <input
            ref={ref}
            type="text"
            className={cn(
              "w-full bg-transparent py-3 pl-11 pr-32",
              "text-sm text-gray-200 placeholder:text-gray-500",
              "focus:outline-none focus:ring-0"
            )}
            placeholder="Search"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          <button
            type="button"
            onClick={onCommandClick}
            className={cn(
              "absolute right-3 flex items-center",
              "rounded-lg border border-gray-700",
              "px-1.5 py-0.5",
              "hover:bg-gray-800/50",
              "transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
            )}
          >
            <Command className="h-3 w-3 text-gray-500" aria-hidden="true" />
            <span
              className="ml-1 text-xs text-gray-500"
              aria-label="Press Command K to open command palette"
            >
              K
            </span>
          </button>
        </div>
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
