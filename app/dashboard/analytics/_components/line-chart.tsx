"use client";

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';

const data = [
  { time: '00:00', sales: 10 },
  { time: '06:00', sales: 20 },
  { time: '12:00', sales: 15 },
  { time: '18:00', sales: 25 },
];

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-500/20 px-3 py-2 rounded-lg backdrop-blur-sm">
        <p className="text-sm text-black">
          TVL: {payload[0].value}M at {label}
        </p>
      </div>
    );
  }
  return null;
};

const CustomDot = (props: any) => {
  const { cx, cy, index, dataLength } = props;
  if (index === dataLength - 1) {
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={5} 
        fill="#2ca053"
        stroke="white"
        strokeWidth={2}
      />
    );
  }
  return null;
};

const Sales = () => {
  return (
    <div className="w-full lg:w-48 xl:w-full h-48 lg:h-96 bg-gray-100 dark:bg-[#121212] rounded-xl border-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop 
                offset="0%" 
                stopColor="#2ca053" 
                stopOpacity={0.4}
              />
              <stop 
                offset="100%" 
                stopColor="#2ca053" 
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={false}
            height={0}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#2ca053"
            strokeWidth={2}
            fill="url(#salesGradient)"
            dot={<CustomDot dataLength={data.length} />}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const TVL = () => {
  return (
    <div className="w-full lg:w-48 xl:w-48 h-20 relative group">
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="salesGradientEnhanced" x1="0" y1="0" x2="0" y2="1">
              <stop 
                offset="0%" 
                stopColor="#2ca053" 
                stopOpacity={0.4}
              />
              <stop 
                offset="100%" 
                stopColor="#2ca053" 
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={false}
            height={0}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#2ca053"
            strokeWidth={2}
            fill="url(#salesGradientEnhanced)"
            dot={<CustomDot dataLength={data.length} />}
            activeDot={false}
            animationDuration={1500}
            animationBegin={300}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export { TVL, Sales };