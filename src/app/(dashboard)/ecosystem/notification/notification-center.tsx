'use client';

import { useState } from 'react';
import { Bell, Clock, Target, Trophy, X, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'quest' | 'opportunity' | 'update';
  title: string;
  description: string;
  timestamp: string;
  project: {
    name: string;
    logo: string;
  };
  read: boolean;
  points?: number;
  deadline?: string;
  action?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'quest',
    title: 'New Quest Available',
    description: 'Complete 5 trades on UniDex to earn 100 points',
    timestamp: '5 mins ago',
    project: {
      name: 'UniDex',
      logo: 'https://picsum.photos/32/32'
    },
    read: false,
    points: 100,
    deadline: '24h remaining',
    action: 'Start Quest'
  },
  {
    id: '2',
    type: 'opportunity',
    title: 'Limited Time Bonus',
    description: 'Double points on all quests for the next 24 hours',
    timestamp: '1 hour ago',
    project: {
      name: 'GOAT Network',
      logo: 'https://picsum.photos/32/32'
    },
    read: false,
    action: 'View Details'
  },
  // Add more mock notifications...
];

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'quest':
        return <Target className="h-4 w-4" />;
      case 'opportunity':
        return <Trophy className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Notifications</DialogTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
        </DialogHeader>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="quests" className="flex-1">Quests</TabsTrigger>
            <TabsTrigger value="opportunities" className="flex-1">Opportunities</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[400px] mt-4">
            {['all', 'quests', 'opportunities'].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                <div className="space-y-2">
                  {notifications
                    .filter(n => tab === 'all' || n.type === tab.slice(0, -1))
                    .map((notification) => (
                      <Card
                        key={notification.id}
                        className={cn(
                          "p-4 cursor-pointer transition-colors hover:bg-muted/50",
                          !notification.read && "bg-muted/30"
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-8 w-8 rounded-full overflow-hidden">
                            <img
                              src={notification.project.logo}
                              alt={notification.project.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-medium line-clamp-1">{notification.title}</p>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {notification.timestamp}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.description}
                            </p>
                            {(notification.points || notification.deadline) && (
                              <div className="flex items-center gap-4 mt-2">
                                {notification.points && (
                                  <Badge variant="secondary">
                                    {notification.points} points
                                  </Badge>
                                )}
                                {notification.deadline && (
                                  <span className="text-xs text-muted-foreground">
                                    {notification.deadline}
                                  </span>
                                )}
                              </div>
                            )}
                            {notification.action && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 w-full justify-between"
                              >
                                {notification.action}
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}