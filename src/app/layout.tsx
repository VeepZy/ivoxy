import type { Metadata, NextPage } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";

import { getUser } from "@/db/queries";
import { Menu } from "@/features/menu/components/menu";
import { SignIn } from "@/features/menu/components/sign-in";
import { PlayerProvider } from "@/features/player/components/context";
import { ThemeProvider } from "@/features/theme/components/context";

import { Wrapper } from "./wrapper";

const FontSans = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: "variable",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

const RootLayout: NextPage<Readonly<{ children: ReactNode }>> = async ({
    children,
}) => {
    const user = await getUser();

    if (!user) {
        return (
            <html lang="en">
                <body className="min-h-screen bg-background font-sans antialiased">
                    <div className="relative flex min-h-screen flex-col items-center justify-center">
                        <SignIn />
                    </div>
                </body>
            </html>
        );
    }

    return (
        <html lang="en">
            <ThemeProvider>
                <body
                    className={`min-h-screen bg-background font-sans antialiased ${FontSans.variable}`}
                >
                    <div className="relative flex min-h-screen flex-col">
                        <main className="hidden md:flex md:flex-1 md:flex-col">
                            <Menu />
                            <div className="flex flex-1 border-t">
                                <PlayerProvider>
                                    <Wrapper>{children}</Wrapper>
                                </PlayerProvider>
                            </div>
                        </main>
                    </div>
                </body>
            </ThemeProvider>
        </html>
    );
};

export default RootLayout;
