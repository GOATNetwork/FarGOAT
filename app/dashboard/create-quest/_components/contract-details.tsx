"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContractProps {
  onNext: () => void;
  onPrevious?: () => void;
  className?: string;
}

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

const Contract: React.FC<ContractProps> = ({
  onNext,
  onPrevious,
  className
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={cn("space-y-8 w-full px-4 sm:px-6", className)}
    >
      <div className="rounded-lg pb-4 flex-col justify-center items-start inline-flex self-stretch text-lg font-semibold font-inter leading-tight">
        Contract Details
      </div>

      <div className="bg-white dark:bg-[#121212] p-4 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700 space-y-6">
        <div className="text-center py-8 sm:py-12 relative overflow-hidden">
          {/* Shimmer Loading Effect */}
          <div className="absolute inset-0">
            <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/20 dark:via-gray-700/20 to-transparent" />
          </div>

          {/* Content Grid with Shimmer Placeholders */}
          <div className="relative grid gap-6 max-w-lg mx-auto">
            {/* Header Shimmer */}
            <div className="h-8 w-3/4 mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            
            {/* Three Field Shimmers */}
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
            
            {/* Message Box */}
            <div className="mt-8 text-center space-y-2">
              <h3 className="text-xl font-medium text-black dark:text-white">
                Contract Integration Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're working on integrating smart contract functionality.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 gap-4">
        {onPrevious && (
          <motion.button
            onClick={onPrevious}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-4 sm:px-8 py-3 bg-white dark:bg-[#121212] rounded-xl font-semibold 
              hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 border border-gray-200 
              dark:border-gray-700 text-black dark:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </motion.button>
        )}

        <motion.button
          onClick={onNext}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="px-4 sm:px-8 py-3 bg-gray-100 dark:bg-white text-black rounded-xl font-semibold 
            hover:bg-gray-200 dark:hover:bg-gray-100 shadow-lg shadow-gray-100/20 flex items-center gap-2 ml-auto
            transition-colors duration-200"
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Contract;