'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Search, TrendingUp, Users, Award, Info, Clock, Repeat, BarChart3, Menu, Flame, Star, Trophy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import UpcomingEvents from '@/components/ecosystem/quests/Upcomming';
import UserActivities from '@/components/ecosystem/quests/UserActivities';

// Updated mock data for demonstration

const bounties = [
    {
        id: 1,
        title: 'Boost DAU for DeFi Swap',
        trending: true,
        type: 'Founder',
        category: 'DAU Increase',
        points: 500,
        description: 'Increase Daily Active Users (DAU) for our DeFi Swap platform by 500 within 30 days.',
        projectUrl: 'https://defi-swap.example.com',
        projectName: 'DeFi Swap',
        projectLogo: 'https://picsum.photos/32/32?random=1',
        image: 'https://picsum.photos/400/200?random=11',
        target: '500 new DAU',
        currentMetric: '1,000 DAU',
        contractAddress: '0x1234...5678',
        functionName: 'increaseDau()',
    },
    {
        id: 2,
        title: 'Hodl ETH for 30 Days',
        trending: true,
        type: 'Community',
        category: 'Hodl Challenge',
        points: 750,
        description: 'Hold ETH in the contract for 30 days without withdrawing.',
        projectUrl: 'https://hodl-eth.example.com',
        projectName: 'Hodl ETH',
        projectLogo: 'https://picsum.photos/32/32?random=2',
        image: 'https://picsum.photos/400/200?random=12',
        target: '30 days',
        currentMetric: '0 days',
        contractAddress: '0x2345...6789',
        functionName: 'startHodl()',
        timeSet: '30 days',
    },
    {
        id: 3,
        title: 'Pump TOKEN to $1',
        trending: true,
        type: 'Founder',
        category: 'Pump Challenge',
        points: 1000,
        description: 'Increase the price of TOKEN to $1 within 14 days.',
        projectUrl: 'https://token-pump.example.com',
        projectName: 'TOKEN Pump',
        projectLogo: 'https://picsum.photos/32/32?random=3',
        image: 'https://picsum.photos/400/200?random=13',
        target: '$1.00',
        currentMetric: '$0.50',
        contractAddress: '0x3456...7890',
        functionName: 'checkPrice()',
        targetPrice: 1.0,
    },
    {
        id: 4,
        title: 'Swap for BTC',
        trending: false,
        type: 'Community',
        category: 'BTC Challenge',
        points: 600,
        description: 'Swap USDT, USDC, ETH, DIA, or BUSD for BTC using our swap contract.',
        projectUrl: 'https://btc-swap.example.com',
        projectName: 'BTC Swap',
        projectLogo: 'https://picsum.photos/32/32?random=4',
        image: 'https://picsum.photos/400/200?random=14',
        target: '10 BTC swapped',
        currentMetric: '2 BTC swapped',
        contractAddress: '0x4567...8901',
        functionName: 'swapToBtc()',
    },
    {
        id: 5,
        title: 'Increase TOKEN/BTC Volume',
        trending: false,
        type: 'Founder',
        category: 'Volume Challenge',
        points: 800,
        description: 'Increase the trading volume of TOKEN/BTC pair to 100 BTC within 7 days.',
        projectUrl: 'https://token-volume.example.com',
        projectName: 'TOKEN Volume',
        projectLogo: 'https://picsum.photos/32/32?random=5',
        image: 'https://picsum.photos/400/200?random=15',
        target: '100 BTC volume',
        currentMetric: '20 BTC volume',
        contractAddress: '0x5678...9012',
        functionName: 'checkVolume()',
    },
];

const projects = [
    { id: 1, name: 'DeFi Swap', points: 1500 },
    { id: 2, name: 'Hodl ETH', points: 1200 },
    { id: 3, name: 'TOKEN Pump', points: 1000 },
    { id: 4, name: 'BTC Swap', points: 950 },
    { id: 5, name: 'TOKEN Volume', points: 1100 },
];

const bountyCategories: string[] = ['DAU Increase', 'Hodl Challenge', 'Pump Challenge', 'BTC Challenge', 'Volume Challenge'];

const trendingQuests = bounties.slice(0, 3).map(bounty => ({
    ...bounty,
    engagement: Math.floor(Math.random() * 1000) + 500,
    growthRate: Math.floor(Math.random() * 50) + 20
  }));
  
const analyticsData = [
    { name: 'Week 1', quests: 45, participants: 320, completion: 28 },
    { name: 'Week 2', quests: 52, participants: 380, completion: 32 },
    { name: 'Week 3', quests: 61, participants: 420, completion: 38 },
    { name: 'Week 4', quests: 67, participants: 480, completion: 42 },
  ];

interface Bounty {
    id: number;
    title: string;
    trending: boolean;
    type: string;
    category: string;
    points: number;
    description: string;
    projectUrl: string;
    projectName: string;
    projectLogo: string;
    image: string;
    target: string;
    currentMetric: string;
    contractAddress: string;
    functionName: string;
    targetPrice?: number;
    timeSet?: string;
}

interface BountyCardProps {
    bounty: Bounty;
    showDetails?: boolean;
}

function BountyCard({ bounty, showDetails = false }: BountyCardProps) {
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'DAU Increase':
                return <Users className="h-4 w-4" />;
            case 'Hodl Challenge':
                return <Clock className="h-4 w-4" />;
            case 'Pump Challenge':
                return <TrendingUp className="h-4 w-4" />;
            case 'BTC Challenge':
                return <Repeat className="h-4 w-4" />;
            case 'Volume Challenge':
                return <BarChart3 className="h-4 w-4" />;
            default:
                return <Info className="h-4 w-4" />;
        }
    };

    return (
        <Card className="w-full">
            <CardHeader className="p-0">
                <Image 
                    src={bounty.image} 
                    alt={bounty.title} 
                    width={400} 
                    height={200} 
                    className="w-full h-36 sm:h-48 object-cover rounded-t-lg" 
                    priority={false}
                />
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{bounty.type}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1 text-xs">
                        {getCategoryIcon(bounty.category)}
                        {bounty.category}
                    </Badge>
                    <span className="text-sm font-bold ml-auto">{bounty.points} Points</span>
                </div>
                <CardTitle className="mb-2 text-lg">{bounty.title}</CardTitle>
                <CardDescription className="mb-4 line-clamp-2">{bounty.description}</CardDescription>
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-4">
                    <div className="flex items-center">
                        <Image 
                            src={bounty.projectLogo} 
                            alt={bounty.projectName} 
                            width={24} 
                            height={24} 
                            className="mr-2 rounded-full" 
                        />
                        <span className="text-sm">{bounty.projectName}</span>
                    </div>
                    <Button variant="outline" size="sm" asChild className="sm:ml-auto">
                        <a href={bounty.projectUrl} target="_blank" rel="noopener noreferrer">
                            View Project <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </div>
                {!showDetails && (
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="flex-1">
                                    Details <Info className="ml-2 h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[90vh] sm:h-[80vh]">
                                <SheetHeader>
                                    <SheetTitle>{bounty.title}</SheetTitle>
                                    <SheetDescription>Bounty Details</SheetDescription>
                                </SheetHeader>
                                <div className="mt-4">
                                    <Image 
                                        src={bounty.image} 
                                        alt={bounty.title} 
                                        width={800} 
                                        height={400} 
                                        className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4" 
                                    />
                                    <div className="flex items-center mb-4">
                                        <Image 
                                            src={bounty.projectLogo} 
                                            alt={bounty.projectName} 
                                            width={32} 
                                            height={32} 
                                            className="mr-2 rounded-full" 
                                        />
                                        <span className="font-bold">{bounty.projectName}</span>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                                        <Card>
                                            <CardHeader className="p-3">
                                                <CardTitle className="text-sm">Points</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-lg sm:text-2xl font-bold">{bounty.points}</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="p-3">
                                                <CardTitle className="text-sm">Target</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-lg sm:text-2xl font-bold">{bounty.target}</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="col-span-2 sm:col-span-1">
                                            <CardHeader className="p-3">
                                                <CardTitle className="text-sm">Current</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-lg sm:text-2xl font-bold">{bounty.currentMetric}</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <p className="mb-4 text-sm sm:text-base">{bounty.description}</p>
                                    <div className="space-y-2 mb-4 text-sm">
                                        <p>
                                            <strong>Contract Address:</strong> {bounty.contractAddress}
                                        </p>
                                        <p>
                                            <strong>Function Name:</strong> {bounty.functionName}
                                        </p>
                                        {bounty.timeSet && (
                                            <p>
                                                <strong>Time Set:</strong> {bounty.timeSet}
                                            </p>
                                        )}
                                        {bounty.targetPrice && (
                                            <p>
                                                <strong>Target Price:</strong> ${bounty.targetPrice.toFixed(2)}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <Button asChild className="flex-1">
                                            <a href={bounty.projectUrl} target="_blank" rel="noopener noreferrer">
                                                View Project <ExternalLink className="ml-2 h-4 w-4" />
                                            </a>
                                        </Button>
                                        <Button variant="outline" className="flex-1">
                                            Claim Bounty <Award className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                        <Button variant="outline" className="flex-1">
                            Claim <Award className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

const QuestStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-medium">Total Active Quests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-2xl font-bold">67</span>
            <Badge variant="secondary" className="ml-auto">+12.5%</Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-2xl font-bold">480</span>
            <Badge variant="secondary" className="ml-auto">+14.3%</Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <BarChart3 className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-2xl font-bold">42%</span>
            <Badge variant="secondary" className="ml-auto">+10.5%</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  const TrendingQuests = () => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Trending Quests</CardTitle>
          <Flame className="h-5 w-5 text-orange-500" />
        </div>
        <CardDescription>Most popular quests this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingQuests.map((quest, index) => (
            <div key={quest.id} className="flex items-center space-x-4 p-2 rounded-lg bg-muted">
              <div className="flex-shrink-0">
                <Image
                  src={quest.projectLogo}
                  alt={quest.projectName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{quest.title}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{quest.engagement} participants</span>
                  <TrendingUp className="h-4 w-4 ml-2 mr-1 text-green-500" />
                  <span>{quest.growthRate}% growth</span>
                </div>
              </div>
              <Badge variant="secondary">{quest.points} pts</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
  
  const HighestRewards = () => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Highest Rewards</CardTitle>
          <Star className="h-5 w-5 text-yellow-500" />
        </div>
        <CardDescription>Quests with the biggest point rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bounties
            .sort((a, b) => b.points - a.points)
            .slice(0, 3)
            .map((bounty, index) => (
              <div key={bounty.id} className="flex items-center space-x-4 p-2 rounded-lg bg-muted">
                <div className="flex-shrink-0 text-lg font-bold text-muted-foreground">
                  #{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{bounty.title}</p>
                  <p className="text-sm text-muted-foreground">{bounty.projectName}</p>
                </div>
                <Badge variant="secondary" className="text-lg">
                  {bounty.points} pts
                </Badge>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );

export default function QuestsPage() {
    const [selectedType, setSelectedType] = useState<string>('All');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredBounties = bounties.filter(
        (bounty) =>
            (selectedType === 'All' || bounty.type === selectedType) &&
            (selectedCategory === 'All' || bounty.category === selectedCategory) &&
            bounty.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold">Quests</h1>
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="sm:hidden">
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                    <div className="space-y-4 pt-8">
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Types</SelectItem>
                                <SelectItem value="Founder">Founder</SelectItem>
                                <SelectItem value="Community">Community</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Categories</SelectItem>
                                {bountyCategories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input 
                                placeholder="Search bounties..." 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                className="pl-8" 
                            />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

        <QuestStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendingQuests />
        </div>
        <div>
          <HighestRewards />
        </div>
      </div>

    <div className='text-xl font-bold pb-2'> Recommended </div>

    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-8">
                {bounties
                    .filter((bounty) => bounty.trending === true)
                    .map((bounty) => (
                            <BountyCard key={bounty.id} bounty={bounty} />
                    ))}
    </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingEvents/>
        </div>
        <div>
          <UserActivities />
        </div>
      </div>

      <div className='text-xl font-bold pb-2'> Explore Quests </div>
        
        <Tabs defaultValue="founder" className="space-y-4">
            <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="founder" className="flex-1">Founder</TabsTrigger>
                <TabsTrigger value="community" className="flex-1">Community</TabsTrigger>
                <TabsTrigger value="leaderboard" className="flex-1">Leaderboard</TabsTrigger>
            </TabsList>

            <div className="hidden sm:flex flex-col sm:flex-row gap-4 mb-4">
                <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Founder">Founder</SelectItem>
                        <SelectItem value="Community">Community</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        {bountyCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                        placeholder="Search bounties..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="pl-8" 
                    />
                </div>
            </div>

            <TabsContent value="founder">
                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBounties.map((bounty) => (
                        <BountyCard key={bounty.id} bounty={bounty} />
                    ))}
                </div>
            </TabsContent>
            
            <TabsContent value="community">
                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {bounties
                        .filter((bounty) => bounty.type === 'Community')
                        .map((bounty) => (
                            <BountyCard key={bounty.id} bounty={bounty} />
                        ))}
                </div>
            </TabsContent>

            <TabsContent value="leaderboard">
                <Card>
                    <CardHeader>
                        <CardTitle>Project Leaderboard</CardTitle>
                        <CardDescription>Top projects by points earned</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {projects
                                .sort((a, b) => b.points - a.points)
                                .map((project, index) => (
                                    <li key={project.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                                        <span className="font-semibold text-sm">
                                            {index + 1}. {project.name}
                                        </span>
                                        <span className="flex items-center text-sm">
                                            <Award className="mr-1 h-4 w-4 text-muted-foreground" />
                                            {project.points} points
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
    );
}


