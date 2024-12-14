"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  bgColor?: string;
  textColor?: string;
  rounded?: string;
  className?: string;
  loading?: boolean;
}

export const MetricCard = React.memo(({
  title,
  value,
  change,
  bgColor = "bg-white dark:bg-[#121212]",
  textColor = "",
  rounded = "rounded-2xl",
  className = "",
  loading = false,
}: MetricCardProps) => {
  const isValidChange = !isNaN(change) && change !== undefined && change !== null;
  const isPositive = isValidChange ? change >= 0 : false;
  const showChange = isValidChange && change !== 0;

  const formatValue = (val: string | number) => {
    if (val === undefined || val === null) return "—";
    if (typeof val === "string") return val.trim() || "—";
    if (typeof val === "number") {
      if (isNaN(val)) return "—";
      return new Intl.NumberFormat().format(val);
    }
    return "—";
  };

  const formatChange = (val: number) => {
    if (!isValidChange) return "0.00";
    return Math.abs(val).toFixed(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ 
        duration: 0.2,
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      className={`
        group relative overflow-hidden
        ${bgColor} ${rounded} p-6 
        shadow-sm border border-gray-200 dark:border-gray-800 
        backdrop-blur-sm backdrop-saturate-150
        transition-all duration-200
        hover:shadow-md
        ${loading ? "animate-pulse" : ""}
        ${className}
      `}
    >
      <div 
        className="
          absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
          bg-[length:200%_200%] animate-gradient-xy
          pointer-events-none
        "
        style={{
          backgroundImage: `
            linear-gradient(
              115deg,
              transparent 0%,
              transparent 40%,
              rgba(255, 255, 255, 0.1) 45%,
              rgba(255, 255, 255, 0.15) 50%,
              rgba(255, 255, 255, 0.1) 55%,
              transparent 60%,
              transparent 100%
            )
          `,
        }}
      />

      <div className="
        absolute inset-0 opacity-0 group-hover:opacity-100
        bg-gradient-to-r from-transparent via-white/10 to-transparent
        blur-xl transition-opacity duration-500
        pointer-events-none
      " />

      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <p className={`text-xs font-medium text-black dark:text-white transition-colors duration-200`}>
            {title || "Untitled"}
          </p>
          {!loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`
                flex items-center gap-1 text-xs px-2 py-1 rounded-full
                backdrop-blur-md backdrop-saturate-150
                ${showChange 
                  ? isPositive 
                    ? 'text-green-500 bg-green-500/10' 
                    : 'text-red-500 bg-red-500/10'
                  : 'text-gray-400 bg-gray-400/10'
                }
              `}
            >
              <span>{formatChange(change)}%</span>
              {showChange ? (
                isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )
              ) : (
                <Minus className="w-3.5 h-3.5" />
              )}
            </motion.div>
          )}
        </div>

        <div className="flex items-end justify-between">
          <motion.h2 
            className={`text-3xl font-semibold ${textColor} transition-colors duration-200`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {loading ? (
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            ) : (
              formatValue(value)
            )}
          </motion.h2>
        </div>
      </div>
    </motion.div>
  );
});

MetricCard.displayName = 'MetricCard';