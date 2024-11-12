"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import QuestCard from "./_components/quest-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import QuestEmptyState from "./_components/empty-state";

type TabType = "founder" | "community" | "leaderboard";

interface Tab {
  id: TabType;
  label: string;
}

const tabs: Tab[] = [
  { id: "founder", label: "Founder Bounties" },
  { id: "community", label: "Community Bounties" },
  { id: "leaderboard", label: "Project Leaderboard" },
];

const QuestCardSkeleton = () => (
  <div className="bg-white dark:bg-[#121212] rounded-lg p-6 space-y-4">
    <div className="flex justify-between items-start">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-6 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
      <Skeleton className="h-6 w-24" />
    </div>
    <Skeleton className="h-16 w-full" />
    <div className="grid grid-cols-3 gap-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-16" />
    </div>
  </div>
);

const QuestsPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("founder");
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const founderQuests = {
    active: [
      {
        id: "1",
        title: "Integration Bounty #1",
        description:
          "Implement key features for the protocol integration with support for multiple chains and enhanced security measures.",
        reward: { amount: 2500, currency: "USDC" },
        tags: ["Integration", "Development"],
        timeLeft: "3 days left",
        status: "active" as const,
        participants: 12,
      },
      {
        id: "2",
        title: "Smart Contract Audit",
        description:
          "Conduct a comprehensive security audit of our smart contracts and provide detailed documentation of findings.",
        reward: { amount: 3500, currency: "USDC" },
        tags: ["Security", "Audit"],
        timeLeft: "5 days left",
        status: "active" as const,
        participants: 8,
      },
      {
        id: "3",
        title: "Frontend Development",
        description:
          "Build responsive UI components for the protocol dashboard.",
        reward: { amount: 2000, currency: "USDC" },
        tags: ["Frontend", "Development"],
        timeLeft: "7 days left",
        status: "active" as const,
        participants: 15,
      },
    ],
    completed: [
      {
        id: "4",
        title: "Documentation Update #1",
        description:
          "Update technical documentation for new features and improve developer onboarding guides",
        reward: { amount: 500, currency: "USDC" },
        tags: ["Documentation"],
        status: "completed" as const,
        participants: 5,
      },
      {
        id: "5",
        title: "Community Management",
        description: "Managed community events and engagement initiatives",
        reward: { amount: 1000, currency: "USDC" },
        tags: ["Community"],
        status: "completed" as const,
        participants: 3,
      },
    ],
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="rounded-lg flex-col justify-center items-start inline-flex self-stretch text-lg font-semibold font-inter leading-tight">
            Quests
          </div>
          <div className="flex space-x-1 rounded-2xl bg-white dark:bg-[#121212] p-1 border border-gray-200 dark:border-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-6 py-2.5 text-sm font-medium transition-all duration-200",
                  "rounded-xl",
                  "focus:outline-none",
                  activeTab === tab.id
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gray-100 dark:bg-gray-800/50 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <Separator />
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {activeTab === "founder" && (
            <>
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-md text-gray-900 dark:text-white">
                    Active Bounties
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {founderQuests.active.length} available
                  </span>
                </div>
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <QuestCardSkeleton />
                    <QuestCardSkeleton />
                    <QuestCardSkeleton />
                  </div>
                ) : founderQuests.active.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {founderQuests.active.map((quest) => (
                      <QuestCard
                        key={quest.id}
                        {...quest}
                        onClick={() => console.log(`Clicked quest ${quest.id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <QuestEmptyState
                    title="No Active Bounties"
                    description="There are currently no active bounties available. Check back soon for new opportunities!"
                  />
                )}
              </section>
              <Separator />
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-md text-gray-900 dark:text-white">
                    Completed Bounties
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {founderQuests.completed.length} completed
                  </span>
                </div>
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <QuestCardSkeleton />
                    <QuestCardSkeleton />
                  </div>
                ) : founderQuests.completed.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {founderQuests.completed.map((quest) => (
                      <QuestCard key={quest.id} {...quest} />
                    ))}
                  </div>
                ) : (
                  <QuestEmptyState
                    title="No Completed Bounties"
                    description="There are no completed bounties yet. Be the first to complete a bounty!"
                  />
                )}
              </section>
            </>
          )}

          {activeTab === "community" && (
            <QuestEmptyState
              title="Coming Soon"
              description="Community bounties are coming soon. Stay tuned for exciting opportunities to contribute!"
            />
          )}

          {activeTab === "leaderboard" && (
            <QuestEmptyState
              title="Leaderboard Coming Soon"
              description="Track your progress and compete with other contributors. The leaderboard will be available soon!"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuestsPage;
