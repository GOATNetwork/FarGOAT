'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { NotificationCenter } from '../../app/(dashboard)/ecosystem/notification/notification-center';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {usePathname()
                                    .split('/')
                                    .filter(Boolean)
                                    .map((segment, index, array) => (
                                        <Fragment key={index}>
                                            <BreadcrumbItem>
                                                {index === array.length - 1 ? (
                                                    <BreadcrumbPage>
                                                        {segment
                                                            .split('-')
                                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                            .join(' ')}
                                                    </BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink href={`/${array.slice(0, index + 1).join('/')}`}>
                                                        {segment
                                                            .split('-')
                                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                            .join(' ')}
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                            {index < array.length - 1 && <BreadcrumbSeparator />}
                                        </Fragment>
                                    ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                 
                    <div className="flex items-center pr-4">
                        <div className='mr-4'>
                            <NotificationCenter />
                        </div>
                        <Button >Connect Wallet</Button>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
