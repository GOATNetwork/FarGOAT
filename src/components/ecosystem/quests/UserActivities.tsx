// components/RecentActivities.tsx

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

interface ActivityItem {
  id: number;
  description: string;
  date: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    description: 'Joined the quest "Boost DAU for DeFi Swap"',
    date: '2023-10-12',
  },
  {
    id: 2,
    description: 'Claimed bounty for "Hodl ETH for 30 Days"',
    date: '2023-10-10',
  },
  {
    id: 3,
    description: 'Completed quest "Swap for BTC"',
    date: '2023-10-08',
  },
];

export default function RecentActivities() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Your latest actions</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="flex items-center justify-between p-2 bg-muted rounded-md"
            >
              <span className="text-sm">{activity.description}</span>
              <span className="text-xs text-muted-foreground">{activity.date}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
