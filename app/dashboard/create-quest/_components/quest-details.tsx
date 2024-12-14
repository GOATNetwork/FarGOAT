"use client";

import React from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { FileInput } from "../_components/file-input";
import { cn } from "@/lib/utils";

interface QuestDetailsData {
  name: string;
  description: string;
  points: string;
  website: string;
  duration: string;
  requiredTRX: string;
  image: File | null;
}

interface FormData extends Partial<QuestDetailsData> {
  [key: string]: any;
}

interface StepProps {
  onNext: () => void;
  onPrevious?: () => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  className?: string;
}

const durations = [
  { value: "1d", label: "1 Day" },
  { value: "1w", label: "1 Week" },
  { value: "1m", label: "1 Month" },
] as const;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

// Validation functions
const validateField = (field: keyof QuestDetailsData, value: any): string => {
  switch (field) {
    case "name":
      return !value
        ? "Quest name is required"
        : value.length < 3
        ? "Quest name must be at least 3 characters"
        : "";
    case "description":
      return !value
        ? "Description is required"
        : value.length < 10
        ? "Description must be at least 10 characters"
        : "";
    case "points":
      return !value
        ? "Points are required"
        : isNaN(Number(value))
        ? "Points must be a number"
        : Number(value) <= 0
        ? "Points must be greater than 0"
        : "";
    case "website":
      if (!value) return "";
      try {
        new URL(value);
        return "";
      } catch {
        return "Please enter a valid URL";
      }
    case "requiredTRX":
      if (!value) return "";
      return isNaN(Number(value))
        ? "TRX must be a number"
        : Number(value) < 0
        ? "TRX cannot be negative"
        : "";
    default:
      return "";
  }
};

const QuestDetails: React.FC<StepProps> = ({
  onNext,
  onPrevious,
  formData,
  setFormData,
  className,
}) => {
  const [formState, setFormState] = React.useState<{
    values: QuestDetailsData;
    errors: Partial<Record<keyof QuestDetailsData, string>>;
  }>(() => ({
    values: {
      name: String(formData.name || ""),
      description: String(formData.description || ""),
      points: String(formData.points || ""),
      website: String(formData.website || ""),
      duration: String(formData.duration || ""),
      requiredTRX: String(formData.requiredTRX || ""),
      image: formData.image || null,
    },
    errors: {},
  }));

  const handleInputChange = (
    field: keyof QuestDetailsData,
    value: string | File | null
  ) => {
    setFormState((prev) => {
      const newValues = { ...prev.values, [field]: value };
      const error = validateField(field, value);

      return {
        values: newValues,
        errors: {
          ...prev.errors,
          [field]: error,
        },
      };
    });
  };

  const handleNext = () => {
    const newErrors: Partial<Record<keyof QuestDetailsData, string>> = {};
    let isValid = true;

    (Object.keys(formState.values) as Array<keyof QuestDetailsData>).forEach(
      (field) => {
        const error = validateField(field, formState.values[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    );

    if (isValid) {
      setFormData({ ...formData, ...formState.values });
      onNext();
    } else {
      setFormState((prev) => ({
        ...prev,
        errors: newErrors,
      }));
      toast.error("Please correct the errors in the form");
    }
  };

  const inputClasses =
    "w-full p-4 bg-white dark:bg-[#121212] rounded-xl border border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-100 transition-colors duration-300 focus:ring-2 focus:ring-gray-100/20 text-black dark:text-white";

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={cn("space-y-8", className)}
    >
      <div className="rounded-lg pb-4 flex-col justify-center items-start inline-flex self-stretch text-lg font-semibold font-inter leading-tight">
        Quest Details
      </div>
      <div className="space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium mb-2 text-black dark:text-white">
            Quest Image
          </label>
          <FileInput
            value={formState.values.image}
            onChange={(file) => handleInputChange("image", file)}
          />
          {formState.errors.image && (
            <span className="text-xs text-red-500 mt-1">
              {formState.errors.image}
            </span>
          )}
        </div>

        <div className="grid gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium mb-2 text-black dark:text-white">
              Quest Name*
            </label>
            <input
              type="text"
              value={formState.values.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={inputClasses}
              placeholder="Enter quest name"
              required
            />
            {formState.errors.name && (
              <span className="text-xs text-red-500 mt-1">
                {formState.errors.name}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium mb-2 text-black dark:text-white">
              Description*
            </label>
            <textarea
              value={formState.values.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={cn(inputClasses, "h-32 resize-none")}
              placeholder="Describe your quest"
              required
            />
            {formState.errors.description && (
              <span className="text-xs text-red-500 mt-1">
                {formState.errors.description}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                Points Allocation*
              </label>
              <input
                type="number"
                value={formState.values.points}
                onChange={(e) => handleInputChange("points", e.target.value)}
                className={inputClasses}
                placeholder="Enter points"
                required
                min="1"
              />
              {formState.errors.points && (
                <span className="text-xs text-red-500 mt-1">
                  {formState.errors.points}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                Website URL
              </label>
              <input
                type="url"
                value={formState.values.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className={inputClasses}
                placeholder="https://example.com"
              />
              {formState.errors.website && (
                <span className="text-xs text-red-500 mt-1">
                  {formState.errors.website}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                Duration
              </label>
              <select
                value={formState.values.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className={inputClasses}
              >
                <option value="">Select duration</option>
                {durations.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                Required TRX
              </label>
              <input
                type="number"
                value={formState.values.requiredTRX}
                onChange={(e) =>
                  handleInputChange("requiredTRX", e.target.value)
                }
                className={inputClasses}
                placeholder="Enter required TRX"
                min="0"
              />
              {formState.errors.requiredTRX && (
                <span className="text-xs text-red-500 mt-1">
                  {formState.errors.requiredTRX}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        {onPrevious && (
          <motion.button
            onClick={onPrevious}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-8 py-3 bg-white dark:bg-[#121212] rounded-xl font-semibold 
              hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 border border-gray-200 dark:border-gray-700
              text-black dark:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </motion.button>
        )}

        <motion.button
          onClick={handleNext}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="px-8 py-3 bg-gray-100 dark:bg-white text-black rounded-xl font-semibold 
            hover:bg-gray-200 dark:hover:bg-gray-100 shadow-lg shadow-gray-100/20 flex items-center gap-2 ml-auto"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuestDetails;
