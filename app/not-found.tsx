"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Custom404() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const goatVariants = {
    idle: {
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
      }
    }
  };

  const bounceVariants = {
    bounce: {
      y: ["0%", "-20%"],
      transition: {
        duration: 0.6,
        yoyo: Infinity,
        ease: "easeOut",
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#121212] p-4">
      <motion.div 
        className="text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-8xl md:text-9xl"
          animate="idle"
        >
          <motion.div
            variants={bounceVariants}
            animate="bounce"
          >
            🐐
          </motion.div>
        </motion.div>

        {/* Error Text */}
        <motion.div variants={itemVariants} className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-500 to-[#FAF186] bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Oops! The page got away
          </p>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-500 dark:text-gray-400 max-w-md mx-auto"
        >
          Looks like our goat wandered off to unknown pastures. 
          Let's get you back to familiar ground.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="outline"
            className="group relative overflow-hidden rounded-lg px-4 py-2 hover:text-[#FAF186] transition-colors"
            asChild
          >
            <Link href="/">
              <motion.div
                className="absolute inset-0 bg-[#FAF186]/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              />
              <span className="relative flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </span>
            </Link>
          </Button>

          <Button
            className="bg-[#FAF186] text-black hover:bg-[#FAF186]/90 rounded-lg px-4 py-2"
            asChild
          >
            <Link href="/">
              <span className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Return Home
              </span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}