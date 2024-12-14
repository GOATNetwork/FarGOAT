"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div>
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
                    .split("/")
                    .filter(Boolean)
                    .map((segment, index, array) => (
                      <Fragment key={index}>
                        <BreadcrumbItem>
                          {index === array.length - 1 ? (
                            <BreadcrumbPage>
                              {segment
                                .split("-")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              href={`/${array.slice(0, index + 1).join("/")}`}
                            >
                              {segment
                                .split("-")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
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
              <Button>Connect Wallet</Button>
            </div>
          </header>
          <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
            <div className="flex flex-col items-center gap-4">
              <AlertCircle className="w-24 h-24 text-red-500 animate-pulse" />
              <h1 className="text-6xl font-bold bg-yellow-400 bg-clip-text text-transparent">
                404
              </h1>
              <p className="text-2xl text-gray-600 font-medium">
                Oops, Page Not Found
              </p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
