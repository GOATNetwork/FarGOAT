"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import {
  Banknote,
  ChevronDown,
  Folder,
  Frame,
  HomeIcon,
  Map,
  PieChart,
  Settings,
  Terminal,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SubItem {
  title: string;
  href: string;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: JSX.Element;
  subItems?: SubItem[];
}

export default function DashboardSideBar() {
  const pathname = usePathname();
  // Track open states for each item using their titles as keys
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const founderItems: SidebarItem[] = [
    {
      title: "Contracts",
      href: "/dashboard",
      icon: <Terminal className="h-3 w-3" />,
      subItems: [
        { title: "Request for Proposal", href: "/dashboard/rfp" },
        { title: "Analytics", href: "/dashboard/analytics" },
      ],
    },
    {
      title: "Create Quests",
      href: "/dashboard/create-quest",
      icon: <Folder className="h-3 w-3" />,
    },
    {
      title: "Documentation",
      href: "/dashboard/documentation",
      icon: <Banknote className="h-3 w-3" />,
      subItems: [
        { title: "Introduction", href: "/dashboard/documentation/intro" },
        { title: "Get Started", href: "/dashboard/documentation/get-started" },
        { title: "Tutorials", href: "/dashboard/documentation/tutorials" },
        { title: "Change Log", href: "/dashboard/documentation/change-log" },
      ],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-3 w-3" />,
      subItems: [
        { title: "General", href: "/dashboard/settings/general" },
      ],
    },
  ];

  const ecosystemItems: SidebarItem[] = [
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: <Frame className="h-3 w-3" />,
    },
    {
      title: "Quests",
      href: "/dashboard/quests",
      icon: <PieChart className="h-3 w-3" />,
    },
    {
      title: "Leaderboard",
      href: "/dashboard/leaderboard",
      icon: <Map className="h-3 w-3" />,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-3 w-3" />,
    },
  ];

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const renderNavItem = (item: SidebarItem) => {
    const isActive = pathname === item.href;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isSectionOpen = openSections[item.title];

    return (
      <motion.div
        key={item.href}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {hasSubItems ? (
          <motion.button
            onClick={() => toggleSection(item.title)}
            className={clsx(
              "w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
              {
                "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50":
                  isActive,
              }
            )}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white"
                whileHover={{ backgroundColor: "#f3f4f6" }}
              >
                {item.icon}
              </motion.div>
              <span className="flex-1">{item.title}</span>
            </div>
            <motion.div
              animate={{ rotate: isSectionOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.button>
        ) : (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Link
              href={item.href}
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                {
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50":
                    isActive,
                }
              )}
            >
              <motion.div
                className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white"
                whileHover={{ backgroundColor: "#f3f4f6" }}
              >
                {item.icon}
              </motion.div>
              <span className="flex-1">{item.title}</span>
            </Link>
          </motion.div>
        )}

        <AnimatePresence>
          {hasSubItems && isSectionOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-9 mt-1 space-y-1 overflow-hidden"
            >
              {item.subItems?.map((subItem) => (
                <motion.div
                  key={subItem.href}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={subItem.href}
                    className={clsx(
                      "block px-3 py-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                      {
                        "text-gray-900 dark:text-gray-50":
                          pathname === subItem.href,
                      }
                    )}
                  >
                    {subItem.title}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-[55px] items-center justify-between border-b px-3 w-full"
        >
          <a href="#" className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-yellow-500 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11.1 7.1a16.55 16.55 0 0 1 10.9 4" />
                <path d="M12 12a12.6 12.6 0 0 1-8.7 5" />
                <path d="M16.8 13.6a16.55 16.55 0 0 1-9 7.5" />
                <path d="M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10" />
                <path d="M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Goat Leprachun</span>
              <span className="truncate text-xs">Ecosystem</span>
            </div>
          </a>
        </motion.div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <div className="text-xs py-2">Founder</div>
            {founderItems.map(renderNavItem)}

            <Separator className="my-3" />

            <div className="text-xs py-2">Ecosystem</div>
            {ecosystemItems.map(renderNavItem)}
          </nav>
        </div>
      </div>
    </div>
  );
}