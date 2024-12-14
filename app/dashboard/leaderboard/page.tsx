"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronUp, ChevronDown, Copy, Check } from "lucide-react";
import { mockWalletData } from "../_utils/leaderboard-data";

type CategoryType = 'DAU' | 'TRX' | 'TVL' | 'Quest' | 'BTC';

interface WalletData {
  address: string;
  category: CategoryType;
  value?: number;
}

interface GOATLeadersProps {
  data?: WalletData[];
  onCopy?: (address: string) => void;
  onSort?: (order: "asc" | "desc") => void;
  onFilter?: (category: string) => void;
  onSearch?: (term: string) => void;
}

const categories = [
  { id: "all", label: "All Categories" },
  { id: "DAU", label: "Most Active by DAU" },
  { id: "TRX", label: "Most Bullish by TRX" },
  { id: "TVL", label: "Whales by TVL" },
  { id: "Quest", label: "Most Quest Points" },
  { id: "BTC", label: "Most BTC" },
] as const;

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const GOATLeaders: React.FC<any> = ({
  data = mockWalletData,
  onCopy,
  onSort,
  onFilter,
  onSearch,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const processedData = useMemo(() => {
    try {
      //@ts-ignore
      const filtered = data.filter(item => {
        if (!item?.address || !item?.category) return false;
        const matchesCategory = activeCategory === "all" || item.category === activeCategory;
        const matchesSearch = item.address.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      return [...filtered].sort((a, b) => {
        if (!a?.value || !b?.value) return 0;
        return sortOrder === "asc" ? a.value - b.value : b.value - a.value;
      });
    } catch (error) {
      console.error("Error processing data:", error);
      return [];
    }
  }, [data, activeCategory, searchTerm, sortOrder]);

  const handleCopyWallet = async (wallet: string) => {
    try {
      await navigator.clipboard.writeText(wallet);
      setCopiedWallet(wallet);
      onCopy?.(wallet);
      setTimeout(() => setCopiedWallet(null), 2000);
    } catch (error) {
      console.error("Failed to copy wallet address:", error);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    onFilter?.(category);
    setIsDropdownOpen(false);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch?.(term);
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onSort?.(newOrder);
  };

  return (
    <div className="w-full space-y-6 p-6 rounded-xl">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          GOAT Leaders
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search wallet..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FAF186]/50"
            />
          </div>
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 rounded-lg bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </motion.button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-[#121212] rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-20"
                >
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ x: 2 }}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-[#0F0F0F] transition-colors ${
                        activeCategory === category.id 
                          ? "text-yellow-400 bg-[#FAF186]/5" 
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {category.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-[600px] rounded-lg shadow-sm  bg-gradient-to-r from-[#FAF186]/5 to-[#B58F3B]/5 border border-gray-200 dark:border-gray-800">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tableVariants}
          className="min-w-full inline-block align-middle"
        >
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-white/50 dark:bg-[#121212]/50 sticky top-0 z-10 backdrop-blur-sm">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Wallet
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <button
                      onClick={handleSort}
                      className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Value
                      {sortOrder === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white/30 dark:bg-[#121212]/30">
                <AnimatePresence mode="wait">
                  {processedData.map((item, index) => (
                    <motion.tr
                      key={item.address}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="hover:bg-white/50 dark:hover:bg-[#121212]/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        #{index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {`${item.address.slice(0, 6)}...${item.address.slice(-4)}`}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleCopyWallet(item.address)}
                            className="p-1 rounded-md hover:bg-white/50 dark:hover:bg-[#121212]/50"
                          >
                            {copiedWallet === item.address ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </motion.button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-[#FAF186] to-[#B58F3B] text-black">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {item.value?.toLocaleString() ?? '-'}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {processedData.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 dark:text-gray-400">
            {data.length === 0 ? "No data available" : "No results found. Try adjusting your filters."}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default GOATLeaders;