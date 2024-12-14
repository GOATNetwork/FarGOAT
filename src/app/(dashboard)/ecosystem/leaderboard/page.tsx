"use client";
import * as React from 'react';
import Link from 'next/link';
import { 
    ChevronDownIcon, 
    ArrowUpIcon, 
    ArrowDownIcon, 
    TrophyIcon,
    FlameIcon,
    AwardIcon,
    ActivityIcon,
    TrendingUpIcon,
    UserIcon,
    StarIcon,
    CrownIcon,
    BitcoinIcon
} from 'lucide-react';
import {
    LineChart,
    Line,
    ResponsiveContainer
} from 'recharts';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// GOAT Club data
const GOATClubData = [
    {
        title: 'Wallets Most Active by DAU',
        description: 'Top performers based on daily active usage',
        icon: <ActivityIcon className="w-5 h-5" />,
        trend: [
            { day: 'Mon', value: 85 },
            { day: 'Tue', value: 88 },
            { day: 'Wed', value: 92 },
            { day: 'Thu', value: 90 },
            { day: 'Fri', value: 95 }
        ],
        wallets: [
            { 
                address: '0x1234...5678', 
                score: 95, 
                change: 'up', 
                rank: 1,
                streak: 7,
                achievements: ['Early Adopter', 'Power User', 'Trend Setter'],
                activity: 'Very High'
            },
            { 
                address: '0x2345...6789', 
                score: 88, 
                change: 'down', 
                rank: 2,
                streak: 5,
                achievements: ['Consistent Performer', 'Power User'],
                activity: 'High'
            },
            { 
                address: '0x3456...7890', 
                score: 82, 
                change: 'up', 
                rank: 3,
                streak: 3,
                achievements: ['Active User'],
                activity: 'Moderate'
            }
        ]
    },
    {
        title: 'Wallets Most Bullish by TRX',
        description: 'Most optimistic wallets by transaction volume',
        icon: <TrendingUpIcon className="w-5 h-5" />,
        trend: [
            { day: 'Mon', value: 80 },
            { day: 'Tue', value: 82 },
            { day: 'Wed', value: 85 },
            { day: 'Thu', value: 87 },
            { day: 'Fri', value: 92 }
        ],
        wallets: [
            { 
                address: '0x4567...8901', 
                score: 92, 
                change: 'up', 
                rank: 1,
                streak: 6,
                achievements: ['High Roller', 'Top Investor'],
                activity: 'High'
            },
            { 
                address: '0x5678...9012', 
                score: 85, 
                change: 'up', 
                rank: 2,
                streak: 4,
                achievements: ['Bullish Investor'],
                activity: 'Moderate'
            },
            { 
                address: '0x6789...0123', 
                score: 79, 
                change: 'down', 
                rank: 3,
                streak: 2,
                achievements: ['Steady Trader'],
                activity: 'Low'
            }
        ]
    },
    {
        title: 'Wallets Whales by TVL',
        description: 'Top wallets by total value locked',
        icon: <TrendingUpIcon className="w-5 h-5" />,
        trend: [
            { day: 'Mon', value: 98 },
            { day: 'Tue', value: 97 },
            { day: 'Wed', value: 99 },
            { day: 'Thu', value: 100 },
            { day: 'Fri', value: 100 }
        ],
        wallets: [
            { 
                address: '0x7890...1234', 
                score: 100, 
                change: 'up', 
                rank: 1,
                streak: 10,
                achievements: ['Top Whale', 'Investor Elite'],
                activity: 'Very High'
            },
            { 
                address: '0x8901...2345', 
                score: 95, 
                change: 'stable', 
                rank: 2,
                streak: 8,
                achievements: ['Whale'],
                activity: 'High'
            },
            { 
                address: '0x9012...3456', 
                score: 90, 
                change: 'down', 
                rank: 3,
                streak: 6,
                achievements: ['Significant Investor'],
                activity: 'Moderate'
            }
        ]
    },
    {
        title: 'Wallets with Most Quest Points',
        description: 'Leading wallets by quest completion points',
        icon: <TrendingUpIcon className="w-5 h-5" />,
        trend: [
            { day: 'Mon', value: 84 },
            { day: 'Tue', value: 86 },
            { day: 'Wed', value: 87 },
            { day: 'Thu', value: 89 },
            { day: 'Fri', value: 91 }
        ],
        wallets: [
            { 
                address: '0x0123...4567', 
                score: 87, 
                change: 'up', 
                rank: 1,
                streak: 9,
                achievements: ['Quest Master', 'Goal Achiever'],
                activity: 'High'
            },
            { 
                address: '0x1234...5678', 
                score: 84, 
                change: 'down', 
                rank: 2,
                streak: 5,
                achievements: ['Quest Enthusiast'],
                activity: 'Moderate'
            },
            { 
                address: '0x2345...6789', 
                score: 80, 
                change: 'up', 
                rank: 3,
                streak: 4,
                achievements: ['Consistent Achiever'],
                activity: 'Low'
            }
        ]
    },
    {
        title: 'Wallets with the Most BTC',
        description: 'Wallets with the highest Bitcoin holdings',
        icon: <BitcoinIcon className="w-5 h-5" />,
        trend: [
            { day: 'Mon', value: 96 },
            { day: 'Tue', value: 98 },
            { day: 'Wed', value: 97 },
            { day: 'Thu', value: 99 },
            { day: 'Fri', value: 98 }
        ],
        wallets: [
            { 
                address: '0x3456...7890', 
                score: 98, 
                change: 'up', 
                rank: 1,
                streak: 8,
                achievements: ['Bitcoin Whale', 'Top Holder'],
                activity: 'Very High'
            },
            { 
                address: '0x4567...8901', 
                score: 93, 
                change: 'stable', 
                rank: 2,
                streak: 6,
                achievements: ['Significant BTC Holder'],
                activity: 'High'
            },
            { 
                address: '0x5678...9012', 
                score: 89, 
                change: 'down', 
                rank: 3,
                streak: 4,
                achievements: ['BTC Investor'],
                activity: 'Moderate'
            }
        ]
    }
];
// Project data
const projectData: Project[] = [
    {
        id: '1',
        name: 'DeFi Swap',
        contracts: 5,
        type: 'DEX',
        tvl: 5000000000,
        trx: 1000000,
        dau: 500000,
        questPoints: 10000,
        lastPosted: '2023-07-15',
        twitterFollowers: 1000000,
        discordMembers: 500000,
    },
    {
        id: '2',
        name: 'Yield Farm',
        contracts: 3,
        type: 'Yield',
        tvl: 3000000000,
        trx: 750000,
        dau: 300000,
        questPoints: 8000,
        lastPosted: '2023-07-14',
        twitterFollowers: 800000,
        discordMembers: 400000,
    },
    {
        id: '3',
        name: 'NFT Marketplace',
        contracts: 4,
        type: 'NFT',
        tvl: 2000000000,
        trx: 500000,
        dau: 200000,
        questPoints: 6000,
        lastPosted: '2023-07-13',
        twitterFollowers: 600000,
        discordMembers: 300000,
    },
];

// Quest Leaderboard data
const questLeaderboardData: QuestLeaderboardEntry[] = [
    {
        id: '1',
        address: '0x1234...5678',
        questPoints: 10000,
        earnedRewards: 50,
        completedQuests: 25,
    },
    {
        id: '2',
        address: '0x2345...6789',
        questPoints: 8500,
        earnedRewards: 40,
        completedQuests: 20,
    },
    {
        id: '3',
        address: '0x3456...7890',
        questPoints: 7200,
        earnedRewards: 35,
        completedQuests: 18,
    },
];

type Project = {
    id: string;
    name: string;
    contracts: number;
    type: string;
    tvl: number;
    trx: number;
    dau: number;
    questPoints: number;
    lastPosted: string;
    twitterFollowers: number;
    discordMembers: number;
};

type QuestLeaderboardEntry = {
    id: string;
    address: string;
    questPoints: number;
    earnedRewards: number;
    completedQuests: number;
};

const projectColumns: ColumnDef<Project>[] = [
    {
        accessorKey: 'name',
        header: 'Project Name',
        cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'contracts',
        header: 'Contracts',
        cell: ({ row }) => <div className="text-center">{row.getValue('contracts')}</div>,
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => <div className="capitalize">{row.getValue('type')}</div>,
    },
    {
        accessorKey: 'tvl',
        header: () => <div className="text-right">TVL</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('tvl'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                maximumFractionDigits: 1,
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'trx',
        header: () => <div className="text-right">TRX</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('trx'));
            const formatted = new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'dau',
        header: () => <div className="text-right">DAU</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('dau'));
            const formatted = new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'questPoints',
        header: () => <div className="text-right">Quest Points</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('questPoints'));
            const formatted = new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
];

const questLeaderboardColumns: ColumnDef<QuestLeaderboardEntry>[] = [
    {
        accessorKey: 'address',
        header: 'Wallet Address',
        cell: ({ row }) => (
            <Link href={`/profile/${row.getValue('address')}`} className="font-mono text-blue-600 hover:underline">
                {row.getValue('address')}
            </Link>
        ),
    },
    {
        accessorKey: 'questPoints',
        header: () => <div className="text-right">Quest Points</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('questPoints'));
            const formatted = new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'earnedRewards',
        header: () => <div className="text-right">Earned Rewards</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('earnedRewards'));
            const formatted = new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 2,
            }).format(amount);
            return <div className="text-right font-medium">{formatted}K</div>;
        },
    },
    {
        accessorKey: 'completedQuests',
        header: () => <div className="text-right">Completed Quests</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('completedQuests'));
            return <div className="text-right font-medium">{amount}</div>;
        },
    },
];

// Achievement Badge Component
const AchievementBadge = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#FFE155] to-[#FFE155] text-black rounded-full text-xs">
        {icon}
        <span>{title}</span>
    </div>
);

// Streak Indicator Component
const StreakIndicator = ({ days }: { days: number }) => (
    <div className="flex items-center gap-1 text-orange-500">
        <FlameIcon className="w-4 h-4" />
        <span className="text-sm font-medium">{days} day streak!</span>
    </div>
);

// Activity Sparkline
const ActivitySparkline = ({ data }: { data: { day: string; value: number }[] }) => (
    <div className="h-12">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#242424" 
                    strokeWidth={2} 
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

// Enhanced Leader Card Component
type Category = {
    title: string;
    description: string;
    icon: React.ReactNode;
    trend: { day: string; value: number }[];
    wallets: {
        address: string;
        score: number;
        change: string;
        rank: number;
        streak: number;
        achievements: string[];
        activity: string;
    }[];
};

const LeaderCard = ({ category }: { category: Category }) => {
    return (
        <Card className="hover:shadow-lg transition-all duration-200">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-yellow-400 rounded-lg">
                            {category.icon}
                        </div>
                        <CardTitle className="text-xl font-bold">{category.title}</CardTitle>
                    </div>
                    <TrophyIcon className="w-6 h-6 text-yellow-500" />
                </div>
                <CardDescription>{category.description}</CardDescription>
                <ActivitySparkline data={category.trend} />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {category.wallets.map((wallet, index) => (
                        <div key={index} className="relative">
                            {index === 0 && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <CrownIcon className="w-6 h-6 text-yellow-500" />
                                </div>
                            )}
                            <div className="flex flex-col p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-3">
                                        <Badge 
                                            variant={index === 0 ? "default" : "secondary"} 
                                            className="w-6 h-6 rounded-full flex items-center justify-center"
                                        >
                                            {wallet.rank}
                                        </Badge>
                                        <Link 
                                            href={`/profile/${wallet.address}`} 
                                            className="text-blue-600 hover:underline font-mono"
                                        >
                                            {wallet.address}
                                        </Link>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold">{wallet.score}</span>
                                        {wallet.change === 'up' ? (
                                            <ArrowUpIcon className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <ArrowDownIcon className="w-4 h-4 text-red-500" />
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {wallet.streak > 0 && (
                                        <StreakIndicator days={wallet.streak} />
                                    )}
                                    <div className="flex flex-wrap gap-1">
                                        {wallet.achievements.map((achievement, i) => (
                                            <AchievementBadge 
                                                key={i} 
                                                title={achievement} 
                                                icon={<StarIcon className="w-3 h-3" />} 
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <UserIcon className="w-4 h-4" />
                                        <span>Activity: {wallet.activity}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

function DataTable<TData, TValue>({ 
    columns, 
    data,
    title,
    description 
}: { 
    columns: ColumnDef<TData, TValue>[]; 
    data: TData[];
    title: string;
    description?: string;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-2">
                        <Input
                            placeholder="Filter entries..."
                            className="max-w-sm"
                            onChange={(event) =>
                                table.getColumn(columns[0].id ?? '')?.setFilterValue(event.target.value)
                            }
                        />
                        <Badge variant="outline" className="h-8 px-3">
                            {table.getFilteredRowModel().rows.length} Results
                        </Badge>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="hover:bg-gray-50"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Stats Overview Component
const StatsOverview = () => {
    const stats = [
        { title: "Total Participants", value: "12.5K", icon: <UserIcon />, change: "+12%" },
        { title: "Active Wallets", value: "8.2K", icon: <ActivityIcon />, change: "+5%" },
        { title: "Total Rewards", value: "1.2M", icon: <AwardIcon />, change: "+8%" },
        { title: "Competition Score", value: "92", icon: <TrendingUpIcon />, change: "+3%" }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardContent className="flex flex-col gap-3 pt-6">
                        <div className="flex items-center justify-between">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                {React.cloneElement(stat.icon, { className: "w-5 h-5 text-purple-600" })}
                            </div>
                            <Badge variant="outline" className="text-green-600">
                                {stat.change}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{stat.title}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

// Enhanced Main Component
export default function LeaderboardPage() {
    const [progress] = React.useState(85);

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
                <p className="text-muted-foreground">
                    Track top performers across different categories
                </p>
            </div>
            
            <StatsOverview />

            <Card className="bg-gray-100 text-black">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Current Season Progress</CardTitle>
                            <CardDescription className="text-black/60">
                                Season 1 - 2024 Q1
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-full">
                            <TrophyIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">12 Days Left</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="bg-blue-100" />
                        <div className="flex justify-between text-sm text-black/60 mt-2">
                            <span>Current Points: 8,532</span>
                            <span>Next Reward: 10,000</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="GOATclub" className="space-y-4">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="GOATclub" className="flex items-center gap-2">
                        <TrophyIcon className="w-4 h-4" />
                        GOAT Leaders
                    </TabsTrigger>
                    <TabsTrigger value="projects">Project Leaderboard</TabsTrigger>
                    <TabsTrigger value="questleaderboard">Quest Leaderboard</TabsTrigger>
                </TabsList>
                
                <TabsContent value="GOATclub">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {GOATClubData.map((category, index) => (
                            <LeaderCard key={index} category={category} />
                        ))}
                    </div>
                </TabsContent>
                
                <TabsContent value="projects">
                    <DataTable 
                        columns={projectColumns} 
                        data={projectData}
                        title="Project Rankings"
                        description="Top performing projects based on key metrics"
                    />
                </TabsContent>
                
                <TabsContent value="questleaderboard">
                    <DataTable 
                        columns={questLeaderboardColumns} 
                        data={questLeaderboardData}
                        title="Quest Champions"
                        description="Leading wallets in quest completion and rewards"
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}