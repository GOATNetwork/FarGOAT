"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import QuestTypeSelection from "./_components/quest-selection";
import QuestDetails from "./_components/quest-details";
import Contract from "./_components/contract-details";

interface FormData {
  questType?: string;
  category?: string;
  name?: string;
  description?: string;
  points?: string;
  website?: string;
  duration?: string;
  requiredTRX?: string;
  image?: File | null;
}

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export function Review({ onPrevious, formData, className }: any) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Quest created successfully!");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const reviewSections = [
    {
      title: "Quest Type",
      data: [
        { label: "Type", value: formData.questType },
        { label: "Category", value: formData.category },
      ],
    },
    {
      title: "Quest Information",
      data: [
        { label: "Name", value: formData.name },
        { label: "Description", value: formData.description },
        { label: "Points", value: formData.points },
        { label: "Website", value: formData.website },
        { label: "Duration", value: formData.duration },
        { label: "Required TRX", value: formData.requiredTRX },
      ],
    },
  ];

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 space-y-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-16 w-16 text-gray-400 dark:text-gray-500" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-medium text-gray-900 dark:text-gray-100"
        >
          Creating your quest...
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="space-y-8 w-full max-w-3xl"
    >
      <div className="flex items-start">
      <div className="rounded-lg pb-4 flex-col justify-center items-start inline-flex self-stretch text-lg font-semibold font-inter leading-tight">
        Review Success
      </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 sm:p-8 bg-green-500/5 dark:bg-green-500/10 border border-green-500/20 
          dark:border-green-500/30 rounded-xl"
      >
        <div className="flex items-center justify-center gap-4">
          <CheckCircle className="h-6 sm:h-8 w-6 sm:w-8 text-green-500 dark:text-green-400" />
          <p className="text-lg sm:text-xl text-green-600 dark:text-green-400 font-medium">
            Your quest has been created successfully!
          </p>
        </div>
      </motion.div>

      <div className="space-y-6">
        {reviewSections.map((section) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {section.title}
            </h3>
            <div className="grid gap-4 bg-white dark:bg-[#121212] p-6 rounded-xl 
              border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              {section.data.map(
                ({ label, value }) =>
                  value && (
                    <div
                      key={label}
                      className="flex justify-between items-center gap-4"
                    >
                      <span className="text-gray-500 dark:text-gray-400">{label}</span>
                      <span className="text-gray-900 dark:text-white font-medium">{value}</span>
                    </div>
                  )
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {formData.image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quest Image
          </h3>
          <div className="relative aspect-video w-full max-w-md mx-auto overflow-hidden 
            rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <Image
              src={URL.createObjectURL(formData.image)}
              alt="Quest preview"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      )}

      <motion.div className="flex justify-start pt-6">
        <motion.button
          onClick={onPrevious}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className=
            "px-6 sm:px-8 py-3 text-gray-900 border border-gray-200 dark:border-gray-800 dark:text-white rounded-xl flex items-center gap-2 shadow-sm font-semibold transition-all duration-200 bg-white dark:bg-[#121212] hover:bg-gray-50 dark:hover:bg-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Details</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

const Create = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});

  const steps = [
    { number: 1, title: "Quest Type" },
    { number: 2, title: "Details" },
    { number: 3, title: "Contract" },
    { number: 4, title: "Review" },
  ];

  const handleNext = (step: number) => {
    if (step === 2) {
      const requiredFields = ["name", "description", "points"];
      //@ts-ignore
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        toast.error("Please fill in all required fields");
        return;
      }
    }

    setCurrentStep(step + 1);
  };

  const handlePrevious = (step: number) => {
    setCurrentStep(step - 1);
  };

  return (
    <div className="min-h-screen text-black dark:text-white p-6 sm:p-8">
      <div className="rounded-lg pb-4 flex-col justify-center items-start inline-flex self-stretch text-lg font-semibold font-inter leading-tight">
        Create Quest
      </div>
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <motion.div
                  className="flex items-center relative z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center
                      transition-colors duration-300 shadow-lg
                      ${
                        currentStep === step.number
                          ? "bg-gray-100 text-[#121212] shadow-gray-100/20"
                          : currentStep > step.number
                          ? "bg-green-500 text-[#121212] shadow-green-500/20"
                          : "bg-[#121212] text-gray-300 border border-gray-700"
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="text-lg font-semibold">
                        {step.number}
                      </span>
                    )}
                  </motion.div>
                  <span
                    className={`ml-3 hidden sm:block text-sm font-medium
                    transition-colors duration-300
                    ${
                      currentStep === step.number
                        ? "text-black"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div
                    className={`flex-1 h-1 mx-4 rounded-xl transition-colors duration-500
                      ${
                        currentStep > step.number
                          ? "bg-green-500"
                          : "bg-gray-700"
                      }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.2 }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <motion.div
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <QuestTypeSelection
                key="quest-type"
                onNext={() => setCurrentStep(2)}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {currentStep === 2 && (
              <QuestDetails
                key="quest-details"
                onNext={() => handleNext(2)}
                onPrevious={() => handlePrevious(2)}
                formData={formData}
                setFormData={setFormData}
                className="max-w-3xl mx-auto"
              />
            )}
            {currentStep === 3 && (
              <Contract
                key="contract"
                onNext={() => setCurrentStep(4)}
                onPrevious={() => setCurrentStep(2)}
              />
            )}
            {currentStep === 4 && (
              <Review
                key="review"
                onPrevious={() => setCurrentStep(3)}
                formData={formData}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <div className="fixed bottom-4 right-4 z-50">
          <AnimatePresence>
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg
                    flex items-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Quest created successfully!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Create;
