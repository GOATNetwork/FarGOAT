'use client';

import * as React from 'react';
import { BookOpen, Bot, Command, Frame, LifeBuoy, Map, PieChart, Send, Settings2, SquareTerminal, Volleyball, User } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Contracts',
            url: '/founder/contracts/request-for-proposal',
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: 'Request for Proposal',
                    url: '/founder/contracts/request-for-proposal',
                },
                {
                    title: 'Analytics',
                    url: '/founder/contracts/analytics',
                },
            ],
        },
        {
            title: 'Create Quest',
            url: '/founder/create-quest',
            icon: PieChart,
        },
        {
            title: 'Documentation',
            url: 'https://docs.goat.network/',
            icon: BookOpen,
            items: [
                {
                    title: 'Introduction',
                    url: 'https://docs.goat.network/',
                    TargetEvent:`_blank`
                },
                {
                    title: 'Get Started',
                    url: 'https://docs.goat.network/',
                },
                {
                    title: 'Tutorials',
                    url: 'https://docs.goat.network/',
                },
                {
                    title: 'Changelog',
                    url: 'https://docs.goat.network/',
                },
            ],
        },
        {
            title: 'Settings',
            url: '/founder/settings',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: '/founder/settings',
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: 'Support',
            url: '#',
            icon: LifeBuoy,
        },
        {
            title: 'Feedback',
            url: '/ecosystem/feedback',
            icon: Send,
        },
    ],
    projects: [
        {
            name: 'Projects',
            url: '/ecosystem/projects',
            icon: Frame,
        },
        {
            name: 'Quests',
            url: '/ecosystem/quests',
            icon: PieChart,
        },
        {
            name: 'Leaderboard',
            url: '/ecosystem/leaderboard',
            icon: Map,
        },
        {
            name: 'Profile',
            url: '/ecosystem/profile',
            icon: User,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Volleyball className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Goat Leprachun</span>
                                    <span className="truncate text-xs">Ecosystem</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
        </Sidebar>
    );
}
