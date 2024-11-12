"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

interface ChartEntry {
  date: string;
  bounceRate: number;
  conversionRate: number;
}

interface ComparisonBarChartProps {
  data?: ChartEntry[];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#121212] px-4 py-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600 dark:text-gray-300">
              {entry.name}:
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ComparisonBarChart: React.FC<ComparisonBarChartProps> = ({ 
  data = [
    { date: '21 May', bounceRate: 65, conversionRate: 35 },
    { date: '22 May', bounceRate: 75, conversionRate: 45 },
    { date: '23 May', bounceRate: 55, conversionRate: 25 },
    { date: '24 May', bounceRate: 85, conversionRate: 55 },
    { date: '25 May', bounceRate: 70, conversionRate: 40 },
  ]
}) => {
  return (
    <div className="h-48 lg:h-[300px] p-4 bg-gray-100 border-gray-800 border-2 dark:bg-[#121212] rounded-xl">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false}
            stroke="#E5E7EB"
          />
          <XAxis 
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ 
              fill: '#6B7280',
              fontSize: 12,
              fontFamily: 'Inter'
            }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ 
              fill: '#6B7280',
              fontSize: 12,
              fontFamily: 'Inter'
            }}
            tickFormatter={(value) => `${value}%`}
            dx={-10}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ 
              fill: 'rgba(0, 0, 0, 0.05)',
              radius: 4
            }}
          />
          <Bar
            dataKey="bounceRate"
            fill="#3461FF"
            radius={[4, 4, 0, 0]}
            barSize={20}
            name="Bounce Rate"
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="conversionRate"
            fill="#FAF186"
            radius={[4, 4, 0, 0]}
            barSize={20}
            name="Conversion Rate"
            animationBegin={200}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export { ComparisonBarChart };