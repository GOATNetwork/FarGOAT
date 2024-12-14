"use client";

import React, { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image"; 
import { Edit2, Copy, Check, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileHeaderProps {
  username: string;
  wallet: string;
  level: number;
  points: number;
  avatar: string | StaticImageData; 
  onAvatarUpdate?: (file: File) => void;
  onUsernameUpdate?: (name: string) => void;
}

export const ProfileHeader = ({
  username,
  wallet,
  level,
  points,
  avatar,
  onAvatarUpdate,
  onUsernameUpdate,
}: ProfileHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [copied, setCopied] = useState(false);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const truncateWallet = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyWallet = async () => {
    await navigator.clipboard.writeText(wallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarUpdate) {
      onAvatarUpdate(file);
    }
  };

  const handleUsernameSubmit = () => {
    if (onUsernameUpdate) {
      onUsernameUpdate(newUsername);
    }
    setIsEditing(false);
  };

  return (
    <div className="font-inter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="relative group">
            <motion.div
              className="relative"
              onHoverStart={() => setIsHoveringAvatar(true)}
              onHoverEnd={() => setIsHoveringAvatar(false)}
            >
              <Image
                src={avatar}
                alt="Profile"
                width={130}
                height={130}
                className="rounded-full border-4 border-[#FAF186]/10 object-cover transition-transform duration-300"
                priority
              />
              <AnimatePresence>
                {isHoveringAvatar && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="space-y-2">
            {isEditing ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="bg-[#121212] border px-3 py-1 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAF186]/50"
                  onKeyDown={(e) => e.key === "Enter" && handleUsernameSubmit()}
                />
                <button
                  onClick={handleUsernameSubmit}
                  className="p-2 bg-[#FAF186]/10 hover:bg-[#FAF186]/20 rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4 text-[#FAF186]" />
                </button>
              </motion.div>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="text-lg">{username}</h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-900 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 dark:bg-[#121212] bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900/50 transition-colors"
              onClick={copyWallet}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-gray-400 text-sm font-medium">
                {truncateWallet(wallet)}
              </span>
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <Check className="w-4 h-4 text-green-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <Copy className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto">
          <motion.div
            className="flex-1 sm:flex-none text-center bg-[#FAF186]/5 rounded-xl"
            whileHover={{ scale: 1.05 }}
          >
            <div className="dark:text-[#FAF186] text-yellow-600 bg-yellow-500/40 rounded-xl text-md font-semibold flex items-center h-10 gap-2 p-2">
              <span>⭐</span> Level {level}
            </div>
          </motion.div>
          <motion.div
            className="flex-1 sm:flex-none text-center bg-[#be86fa]/40 rounded-xl"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-md font-semibold flex items-center h-10 gap-2 p-2 text-[#be86fa]">
              {points} Points
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};