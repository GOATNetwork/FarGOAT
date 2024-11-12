import React from "react";

interface Bounty {
  title: string;
  points: number;
  date: string;
}

interface ClaimedBountiesProps {
  bounties: Bounty[];
}

export const ClaimedBounties = ({ bounties }: ClaimedBountiesProps) => {
  return (
    <div className="w-full mt-6 font-inter">
      <div className="rounded-lg py-4 flex-col justify-center items-start inline-flex self-stretch text-lg font-semibold font-inter leading-tight">
        Claimed Bounties
      </div>

      <div className="rounded-lg border-gray-200 dark:border-[#121212] border-2">
        <div className="bg-gray-50 dark:bg-[#121212]">
          <div className="grid grid-cols-12 px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            <div className="col-span-6">Title</div>
            <div className="col-span-3">Points</div>
            <div className="col-span-3">Date</div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {bounties.map((bounty, index) => (
              <div
                key={index}
                className="grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-[#121212] transition-colors cursor-pointer bg-white dark:bg-[#272729]"
              >
                <div className="col-span-6 text-gray-900 dark:text-white font-medium">
                  {bounty.title}
                </div>
                <div className="col-span-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100">
                    {bounty.points} points
                  </span>
                </div>
                <div className="col-span-3 text-gray-500 dark:text-gray-400 text-sm">
                  {bounty.date}
                </div>
              </div>
            ))}
          </div>

          {bounties.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
              No bounties claimed yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimedBounties;