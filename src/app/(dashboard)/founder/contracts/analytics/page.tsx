'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartData } from '@/services/subservice';
import RealTimeChart from '@/components/founder/analytics/charts/RealTimeChart';
import { pubSubService } from '@/services/pubsub.service';

const AnalyticsPage = () => {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [dateRange, setDateRange] = useState<{ from: Date; to?: Date }>({
        from: new Date(new Date().setDate(new Date().getDate() - 30)),
        to: new Date(),
    });
    const [activeTab, setActiveTab] = useState('tvl');

    const [level, setLevel] = useState('aggregate'); // State for level selector
    const [questType, setQuestType] = useState(''); // State for quest type selector
    const [individualQuest, setIndividualQuest] = useState(''); // State for individual quest selector

    const metrics = {
        uniqueUsers: 1250,
        transactions: 8700,
        tokenVolume: 342000,
        tvl: 1250000,
        creditsUsed: 800,
        creditsUnused: 200,
        retention: '65%',
        dailyEngagements: 450,
        totalQuests: 50,
    };

    useEffect(() => {
        const subscription = pubSubService.subscribeToChartData((data) => {
            setChartData(prevData => {
                const newData = [...prevData, data].slice(-30);
                return newData;
            });
        });

        return () => subscription.unsubscribe();
    }, []);

    const latestData = chartData[chartData.length - 1] || { tvl: 0, dau: 0, trx: 0 };

    return (

        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
            {/* Button Group for Level Selection */}
            <div className="mb-6 flex space-x-4">
                {['aggregate', 'quest-type-aggregate', 'individual-quest'].map((option) => (
                    <button
                        key={option}
                        onClick={() => setLevel(option)}
                        className={`px-4 py-2 font-semibold rounded ${
                            level === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        {option.replace(/-/g, ' ')}
                    </button>
                ))}
            </div>
            {/* Conditional Quest Type Selector */}
            {level === 'quest-type-aggregate' && (
                <div className="mb-6">
                    <Select value={questType} onValueChange={setQuestType}>
                        <SelectTrigger><SelectValue placeholder="Select Quest Type" /></SelectTrigger>
                        <SelectContent>
                            {/* These values can be replaced with actual quest types */}
                            <SelectItem value="type1">Type 1</SelectItem>
                            <SelectItem value="type2">Type 2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Conditional Individual Quest Selector */}
            {level === 'individual-quest' && (
                <div className="mb-6">
                    <Select value={individualQuest} onValueChange={setIndividualQuest}>
                        <SelectTrigger><SelectValue placeholder="Select Individual Quest" /></SelectTrigger>
                        <SelectContent>
                            {/* These values can be replaced with actual individual quests */}
                            <SelectItem value="quest1">Quest 1</SelectItem>
                            <SelectItem value="quest2">Quest 2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}

            <div className="mb-6">
                <RealTimeChart />
            </div>

            {/* High-Level Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard title="Daily Active Users" value={latestData.dau.toLocaleString()} change="+5%" />
                <MetricCard title="Daily Transactions (TRX)" value={latestData.trx.toLocaleString()} change="+7%" />
                <MetricCard title="Daily Transaction Volume (DTV)" value={`$${latestData.dtv? latestData.dtv.toLocaleString(): '0'}`} change="+10%" />
                <MetricCard title="TVL" value={`$${((latestData?.tvl ?? 0) / 1000000).toFixed(2)}M`} change="+10%"/>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>{getChartTitle(activeTab)}</CardTitle>
                        <CardDescription>{getChartDescription(activeTab)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                            <TabsList>
                                <TabsTrigger value="tvl">TVL</TabsTrigger>
                                <TabsTrigger value="dau">DAU</TabsTrigger>
                                <TabsTrigger value="trx">TRX</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="h-[270px]">
                            {activeTab === 'dau' ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis 
                                            dataKey="timestamp" 
                                            tickFormatter={(tick) => new Date(tick * 1000).toLocaleDateString()} 
                                        />
                                        <YAxis />
                                        <Tooltip 
                                            labelFormatter={(label) => new Date(label * 1000).toLocaleString()} 
                                        />
                                        <Bar dataKey="dau" fill="#FFFF00" /> {/* Yellow bars */}
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis 
                                            dataKey="timestamp" 
                                            tickFormatter={(tick) => new Date(tick * 1000).toLocaleDateString()} 
                                        />
                                        <YAxis />
                                        <Tooltip 
                                            labelFormatter={(label) => new Date(label * 1000).toLocaleString()} 
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey={activeTab}
                                            stroke="#FFFF00" // Yellow line
                                            strokeWidth={2}
                                            dot={{ fill: 'red', stroke: 'red', r: 4 }} // Red points
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

function MetricCard({ title, value, change }: { title: string; value: string; change: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={`text-xs ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
            </CardContent>
        </Card>
    );
}

function getChartTitle(tab: string) {
    switch (tab) {
        case 'tvl':
            return 'Total Value Locked (TVL)';
        case 'dau':
            return 'Daily Active Users (DAU)';
        case 'trx':
            return 'Daily Transactions (TRX)';
        default:
            return '';
    }
}

function getChartDescription(tab: string) {
    switch (tab) {
        case 'tvl':
            return 'Historical TVL data over time';
        case 'dau':
            return 'Historical DAU data over time';
        case 'trx':
            return 'Historical transaction data over time';
        default:
            return '';
    }
}

export default AnalyticsPage;