import type { Metadata, NextPage, Viewport } from "next";
import { DM_Sans as dmSans } from "next/font/google";
import "./globals.css";
import { type ReactNode, Suspense } from "react";

import { AppMenu } from "@/components/app-menu/menu";
import { SignIn } from "@/components/sign-in";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Toaster } from "@/components/ui/toaster";
import { getPlaylists, getSongs, getUser } from "@/db/queries";
import { AppPlayer } from "@/features/app-player/components/player";
import { AppSidebar } from "@/features/app-sidebar/components/sidebar";
import { DataProvider } from "@/features/context-data/components/provider";
import { ThemeProvider } from "@/features/context-theme/components/provider";
import { createUrl } from "@/utils/url";

const FontSans = dmSans({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: "variable",
    display: "swap",
});

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: "#FAFAF9" },
    ],
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    title: "Ivoxy - Music App",
    description: "Music app",
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: ["music", "app", "nextjs", "react", "typescript"],
    authors: [{ name: "VeepZy", url: "https://github.com/VeepZy" }],
    icons: [
        { rel: "apple-touch-icon", url: "/icon-192x192.png" },
        { rel: "icon", url: "/icon-192x192.png" },
    ],
};

const RootLayout: NextPage<Readonly<{ children: ReactNode }>> = async ({
    children,
}) => {
    const [user, songs, playlists] = await Promise.all([
        getUser(),
        getSongs(),
        getPlaylists(),
    ]);

    if (!user) {
        console.log(createUrl("/api/auth/callback"));
        return (
            <html lang="en">
                <ThemeProvider>
                    <body
                        className={`min-h-screen bg-background font-sans antialiased ${FontSans.variable}`}
                    >
                        <div className="relative flex min-h-screen flex-col items-center justify-center">
                            <SignIn />
                        </div>
                    </body>
                </ThemeProvider>
            </html>
        );
    }

    return (
        <html lang="en">
            <ThemeProvider>
                <body
                    className={`min-h-screen overflow-x-hidden bg-background font-sans antialiased ${FontSans.variable}`}
                >
                    <DataProvider
                        playlists={playlists}
                        songs={songs}
                        user={user}
                    >
                        <ResizablePanelGroup
                            className="min-h-screen"
                            direction="vertical"
                        >
                            <ResizablePanel
                                className="flex items-center border-b"
                                defaultSize={7}
                                maxSize={7}
                            >
                                <AppMenu />
                            </ResizablePanel>

                            <ResizablePanel defaultSize={85} minSize={85}>
                                <ResizablePanelGroup direction="horizontal">
                                    <AppSidebar />
                                    <ResizablePanel
                                        defaultSize={80}
                                        minSize={70}
                                    >
                                        {children}
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </ResizablePanel>

                            <ResizablePanel
                                className="flex flex-col border-t"
                                defaultSize={8}
                                minSize={8}
                            >
                                <AppPlayer />
                            </ResizablePanel>
                            <ResizableHandle />
                        </ResizablePanelGroup>
                    </DataProvider>

                    <Suspense>
                        <Toaster />
                    </Suspense>
                </body>
            </ThemeProvider>
        </html>
    );
};

export default RootLayout;
