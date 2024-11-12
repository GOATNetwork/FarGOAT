'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Analytics Dashboard</h1>
            <div className="mb-6">
                <RealTimeChart />
            </div>
            <div className="grid gap-6 lg:grid-cols-4">
                <div className="space-y-6 lg:col-span-1">
                    <MetricCard title="Total Value Locked (TVL)" value={`$${((latestData?.tvl ?? 0) / 1000000).toFixed(2)}M`} change="+10%" />
                    <MetricCard title="Daily Active Users (DAU)" value={latestData.dau.toLocaleString()} change="+5%" />
                    <MetricCard title="Daily Transactions (TRX)" value={latestData.trx.toLocaleString()} change="+7%" />
                </div>
                <Card className="lg:col-span-3 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform hover:scale-105 transition-all">
                    <CardHeader>
                        <CardTitle className="text-white">{getChartTitle(activeTab)}</CardTitle>
                        <CardDescription className="text-white">{getChartDescription(activeTab)}</CardDescription>
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
                                    <BarChart data={chartData} barSize={20} margin={{ top: 5, right: 10, left: 10, bottom: 5 }} >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                        <XAxis 
                                            dataKey="timestamp" 
                                            tickFormatter={(tick) => new Date(tick * 1000).toLocaleDateString()} 
                                            tick={{ fill: '#fff' }}
                                        />
                                        <YAxis tick={{ fill: '#fff' }} />
                                        <Tooltip 
                                            labelFormatter={(label) => new Date(label * 1000).toLocaleString()} 
                                            contentStyle={{ backgroundColor: '#333', color: '#fff' }}
                                        />
                                        <Bar dataKey="dau" fill="rgb(255, 233, 48)" animationDuration={500} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }} >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                        <XAxis 
                                            dataKey="timestamp" 
                                            tickFormatter={(tick) => new Date(tick * 1000).toLocaleDateString()} 
                                            tick={{ fill: '#fff' }}
                                        />
                                        <YAxis tick={{ fill: '#fff' }} />
                                        <Tooltip 
                                            labelFormatter={(label) => new Date(label * 1000).toLocaleString()} 
                                            contentStyle={{ backgroundColor: '#333', color: '#fff' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey={activeTab}
                                            stroke={getLineColor(activeTab)}
                                            strokeWidth={3}
                                            dot={{ fill: 'white', stroke: getLineColor(activeTab), r: 6 }}
                                            activeDot={{ r: 8 }}
                                            animationDuration={1000}
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
        <Card className="transform transition-transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-gray-800">{value}</div>
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

function getLineColor(tab: string) {
    switch (tab) {
        case 'tvl':
            return '#4CAF50'; // Green for TVL
        case 'dau':
            return '#FF5722'; // Red for DAU
        case 'trx':
            return '#2196F3'; // Blue for TRX
        default:
            return '#888';
    }
}

export default AnalyticsPage;
