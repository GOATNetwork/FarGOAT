"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface FileInputProps {
  onChange: (file: File | null) => void;
  value?: File | null;
}

export const FileInput: React.FC<FileInputProps> = ({ onChange, value }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    onChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          handleFileChange(file);
        }}
      />

      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8
          border-gray-700 hover:border-gray-100
          transition-colors duration-300 cursor-pointer group
          dark:bg-[#121212] bg-gray-100`}
        onClick={() => preview ? handleFileChange(null) : inputRef.current?.click()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative aspect-video w-full"
            >
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover rounded-xl"
              />
              <motion.div
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                  transition-opacity duration-300 rounded-xl flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <X className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8 space-y-4"
            >
              <ImageIcon className="w-12 h-12 text-gray-400 group-hover:text-gray-100 
                transition-colors duration-300" />
              <div className="space-y-2 text-center">
                <p className="text-sm font-medium text-gray-300">
                  Click to upload image
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};