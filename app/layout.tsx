import Provider from "@/app/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthWrapper from "@/components/wrapper/auth-wrapper";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://starter.rasmic.xyz"),
  title: {
    default: "Goat Network",
    template: "%s | 🐐 Goat Network",
  },
  description: "Decentralized Protocol Integration Platform",
  openGraph: {
    title: "🐐 Goat Network",
    description: "Decentralized Protocol Integration Platform",
    images: [
      "https://utfs.io/f/8a428f85-ae83-4ca7-9237-6f8b65411293-eun6ii.png",
    ],
    url: "https://starter.rasmic.xyz/",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐐</text></svg>",
        type: "image/svg+xml",
      },
    ],
    shortcut: [
      {
        url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐐</text></svg>",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐐</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "🐐 Goat Network",
  },
  applicationName: "Goat Network",
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "🐐 Goat Network",
    description: "Decentralized Protocol Integration Platform",
    images: [
      "https://utfs.io/f/8a428f85-ae83-4ca7-9237-6f8b65411293-eun6ii.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            rel="preload"
            href="https://utfs.io/f/31dba2ff-6c3b-4927-99cd-b928eaa54d5f-5w20ij.png"
            as="image"
          />
          <link
            rel="preload"
            href="https://utfs.io/f/69a12ab1-4d57-4913-90f9-38c6aca6c373-1txg2.png"
            as="image"
          />
        </head>
        <body className={GeistSans.className}>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </Provider>
          <Analytics />
        </body>
      </html>
    </AuthWrapper>
  );
}
