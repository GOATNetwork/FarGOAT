export type BountyType = 'Founder' | 'Community';
export type ChallengeType = 'DAU' | 'Hodl' | 'Pump' | 'BTC' | 'Volume';
export type Category = 'DeFi' | 'Trading' | 'Staking' | 'Development' | 'Community';

export interface Bounty {
  id: string;
  title: string;
  description: string;
  type: BountyType;
  challengeType: ChallengeType;
  points: number;
  imageUrl: string;
  category: Category;
  duration: string;
  projectName: string;
  projectLogo: string;
  status: 'active' | 'completed';
  deadline?: string;
}

export const bounties: Bounty[] = [
  {
    id: '1',
    title: 'Boost DAU for DeFi Swap',
    description: 'Increase Daily Active Users (DAU) for our DeFi Swap platform by 500 within 30 days.',
    type: 'Founder',
    challengeType: 'DAU',
    points: 500,
    imageUrl: '/images/defi-swap.jpg',
    category: 'DeFi',
    duration: '30 days',
    projectName: 'DeFi Swap',
    projectLogo: '/logos/defi-swap.png',
    status: 'active',
    deadline: '2024-12-31',
  },
  {
    id: '2',
    title: 'Hodl ETH for 30 Days',
    description: 'Hold ETH in the contract for 30 days without withdrawing.',
    type: 'Community',
    challengeType: 'Hodl',
    points: 750,
    imageUrl: '/images/eth-hodl.jpg',
    category: 'Staking',
    duration: '30 days',
    projectName: 'Hodl ETH',
    projectLogo: '/logos/eth.png',
    status: 'active',
    deadline: '2024-12-15',
  },
];