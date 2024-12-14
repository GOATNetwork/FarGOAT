import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Reward {
  title: string;
  pointsRequired: number;
  claimed?: boolean;
}

interface RewardsSectionProps {
  rewards: Reward[];
  activeTab: "available" | "collected";
  onTabChange: (tab: "available" | "collected") => void;
  onClaimReward?: (reward: Reward) => void;
}

export const RewardsSection = ({
  rewards,
  activeTab,
  onTabChange,
  onClaimReward,
}: RewardsSectionProps) => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const displayedRewards = rewards.filter((reward) =>
    activeTab === "collected" ? reward.claimed : !reward.claimed
  );

  const closePopup = () => setSelectedReward(null);

  const handleClaimReward = () => {
    if (selectedReward && onClaimReward) {
      onClaimReward(selectedReward);
    }
    closePopup();
  };

  return (
    <>
      <div className="w-full pt-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg py-4 flex-col justify-center items-start inline-flex self-stretch text-lg font-semibold font-inter leading-tight text-gray-900 dark:text-white"
        >
          Rewards
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          <motion.button
            onClick={() => onTabChange("available")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 relative flex-1 sm:flex-none min-w-[120px] ${
              activeTab === "available"
                ? "bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm dark:shadow-none"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800/50"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Available Rewards
            {activeTab === "available" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FAF186] to-[#B58F3B]"
                layoutId="activeTab"
              />
            )}
          </motion.button>

          <motion.button
            onClick={() => onTabChange("collected")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 relative flex-1 sm:flex-none min-w-[120px] ${
              activeTab === "collected"
                ? "bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-sm dark:shadow-none"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800/50"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Collected Rewards
            {activeTab === "collected" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FAF186] to-[#B58F3B]"
                layoutId="activeTab"
              />
            )}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {displayedRewards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedRewards.map((reward, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="relative bg-white dark:bg-[#121212] rounded-xl p-4 sm:p-6 overflow-hidden group border border-gray-200 dark:border-gray-800"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FAF186]/20 to-[#B58F3B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#B58F3B] dark:group-hover:text-[#FAF186] transition-colors duration-200">
                          {reward.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[#B58F3B] bg-yellow-100 border-[#B58F3B] border-[1px] font-medium bg-[#FAF186]/10 px-2 py-0.5 rounded-lg">
                            {reward.pointsRequired}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            points required
                          </span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                          reward.claimed
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#FAF186] to-[#B58F3B] text-black hover:shadow-lg hover:shadow-[#FAF186]/20"
                        }`}
                        disabled={reward.claimed}
                        onClick={() =>
                          !reward.claimed && setSelectedReward(reward)
                        }
                      >
                        {reward.claimed ? (
                          <div className="flex items-center justify-center gap-2">
                            <span>Claimed</span>
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z"
                              />
                            </svg>
                          </div>
                        ) : (
                          "Claim Reward"
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 text-gray-500 dark:text-gray-400"
              >
                {activeTab === "available"
                  ? "No rewards available at the moment"
                  : "No rewards collected yet"}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedReward && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closePopup}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  },
                }}
                exit={{
                  scale: 0.8,
                  opacity: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  },
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-white dark:bg-[#121212] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 mx-auto"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Claim Reward
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 px-2">
                    Are you sure you want to claim{" "}
                    <span className="text-[#B58F3B] dark:text-[#FAF186]">
                      {selectedReward.title}
                    </span>{" "}
                    for {selectedReward.pointsRequired} points?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={closePopup}
                      className="py-3 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClaimReward}
                      className="py-3 px-4 rounded-lg bg-gradient-to-r from-[#FAF186] to-[#B58F3B] text-black font-medium hover:shadow-lg hover:shadow-[#FAF186]/20 transition-all w-full"
                    >
                      Confirm
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default RewardsSection;
