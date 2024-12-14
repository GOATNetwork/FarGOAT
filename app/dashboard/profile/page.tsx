"use client";

import React, { useState } from "react";
import { ProfileHeader } from "@/app/dashboard/profile/_components/profile-header";
import { ClaimedBounties } from "@/app/dashboard/profile/_components/claimed-bounties";
import RewardsSection from "@/app/dashboard/profile/_components/reward-section";
import profileImage from "@/public/profile/image.png";
import { mockBounties, mockRewards } from "../_utils/profile-data";

const ProfilePage = () => {
  const [activeRewardsTab, setActiveRewardsTab] = useState<'available' | 'collected'>('available');

  const handleAvatarUpdate = (file: File) => {
    console.log('Updating avatar:', file);
  };

  const handleUsernameUpdate = (newUsername: string) => {
    console.log('Updating username:', newUsername);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl space-y-8 font-inter">
      <div className="rounded-lg flex-col justify-center items-start inline-flex self-stretch text-lg font-semibold font-inter leading-tight">
        Profile
      </div>

      <div className="space-y-8">
        <ProfileHeader
          username="0xsarthak13"
          wallet="0x16a0689fa6a47A998525787989af109b75b6B78e"
          level={5}
          points={1500}
          avatar={profileImage}
          onAvatarUpdate={handleAvatarUpdate}
          onUsernameUpdate={handleUsernameUpdate}
        />

        <div className="space-y-6">
          <ClaimedBounties bounties={mockBounties} />
          
          <RewardsSection
            rewards={mockRewards}
            activeTab={activeRewardsTab}
            onTabChange={setActiveRewardsTab}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;