"use client";

import * as React from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  CircleDollarSign,
  Users,
  LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils"; // Utility for combining classnames

// Types
interface QuestType {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
}

interface Category {
  name: string;
  description: string;
}

interface QuestFormData {
  questType?: string;
  category?: string;
  [key: string]: any;
}

interface StepProps {
  onNext: () => void;
  formData: QuestFormData;
  setFormData: (data: QuestFormData) => void;
  className?: string;
}

// Animation variants
const containerVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const cardVariants: Variants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 },
};

// Constants
const QUEST_TYPES: QuestType[] = [
  {
    id: "TVL",
    icon: CircleDollarSign,
    label: "TVL",
    description: "Total Value Locked in the protocol",
  },
  {
    id: "TRX",
    icon: ArrowLeftRight,
    label: "TRX",
    description: "Transaction volume and activity",
  },
  {
    id: "DAU",
    icon: Users,
    label: "DAU",
    description: "Daily Active Users engagement",
  },
] as const;

const CATEGORIES: Record<string, Category[]> = {
  TVL: [
    { name: "Hodl", description: "Long-term value retention" },
    { name: "Pump", description: "Rapid value accumulation" },
  ],
  TRX: [
    { name: "BTC", description: "Bitcoin-related transactions" },
    { name: "To The Moon", description: "High-growth opportunities" },
  ],
  DAU: [
    { name: "Social", description: "Social media engagement" },
    { name: "Community", description: "Community building activities" },
  ],
} as const;

// Component
const QuestTypeSelection: React.FC<StepProps> = ({
  onNext,
  formData,
  setFormData,
  className,
}) => {
  const [selectedType, setSelectedType] = React.useState<string>(
    formData.questType || ""
  );
  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    formData.category || ""
  );

  // Handlers
  const handleTypeSelect = React.useCallback((typeId: string) => {
    setSelectedType(typeId);
    // Reset category if type changes
    if (typeId !== selectedType) {
      setSelectedCategory("");
    }
  }, [selectedType]);

  const handleCategorySelect = React.useCallback((categoryName: string) => {
    setSelectedCategory(categoryName);
  }, []);

  const handleNext = React.useCallback(() => {
    if (!selectedType || !selectedCategory) {
      toast.error("Please select both quest type and category");
      return;
    }
    setFormData({
      ...formData,
      questType: selectedType,
      category: selectedCategory,
    });
    onNext();
  }, [selectedType, selectedCategory, formData, setFormData, onNext]);

  // Render methods
  const renderQuestTypeButton = React.useCallback(
    ({ id, icon: Icon, label, description }: QuestType) => {
      const isSelected = selectedType === id;
      return (
        <motion.button
          key={id}
          onClick={() => handleTypeSelect(id)}
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
          className={cn(
            "relative rounded-xl p-4 w-full flex items-center gap-6 transition-all duration-300",
            isSelected
              ? "bg-gray-100 dark:bg-white/10 shadow-lg shadow-gray-100/20"
              : "bg-white dark:bg-[#121212] hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-gray-200 dark:border-gray-800"
          )}
        >
          <div
            className={cn(
              "shrink-0 p-3 rounded-xl",
              isSelected
                ? "bg-gray-200 dark:bg-white/20"
                : "bg-gray-100 dark:bg-gray-800"
            )}
          >
            <Icon className="w-8 h-8" />
          </div>

          <div className="flex-1 text-left min-w-0">
            <h3 className="text-xl font-semibold mb-1">{label}</h3>
            <p className="text-sm line-clamp-2 opacity-80">{description}</p>
          </div>
        </motion.button>
      );
    },
    [selectedType, handleTypeSelect]
  );

  const renderCategoryButton = React.useCallback(
    ({ name, description }: Category) => {
      const isSelected = selectedCategory === name;
      return (
        <motion.button
          key={name}
          onClick={() => handleCategorySelect(name)}
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
          className={cn(
            "p-4 rounded-xl transition-all duration-300 text-left w-full",
            isSelected
              ? "bg-gray-100 dark:bg-white/10 shadow-lg shadow-gray-100/20"
              : "bg-white dark:bg-[#121212] hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-gray-200 dark:border-gray-800"
          )}
        >
          <div className="space-y-1">
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm opacity-80">{description}</p>
          </div>
        </motion.button>
      );
    },
    [selectedCategory, handleCategorySelect]
  );

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
      className={cn("text-black dark:text-white space-y-6", className)}
    >
      {/* Quest Type Selection */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Select Quest Type</h2>
          <p className="text-xs opacity-80">
            Choose the type of quest you want to create
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUEST_TYPES.map(renderQuestTypeButton)}
        </div>
      </section>

      {/* Category Selection */}
      <AnimatePresence mode="wait">
        {selectedType && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-lg font-semibold">Select Category</h2>
              <p className="text-xs opacity-80">
                Choose a category for your quest
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CATEGORIES[selectedType]?.map(renderCategoryButton)}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Next Button */}
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={handleNext}
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
          className={cn(
            "px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300",
            selectedType && selectedCategory
              ? "bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 shadow-lg shadow-gray-100/20"
              : "bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed"
          )}
          disabled={!selectedType || !selectedCategory}
        >
          <span>Next Step</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default QuestTypeSelection;