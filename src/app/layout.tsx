import type { Metadata, NextPage } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";

const FontSans = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: "variable",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

const RootLayout: NextPage<Readonly<{ children: ReactNode }>> = ({
    children,
}) => {
    return (
        <html lang="en">
            <body
                className={`min-h-screen bg-background font-sans antialiased ${FontSans.variable}`}
            >
                <div className="relative flex min-h-screen flex-col">
                    <main className="flex-1">{children}</main>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
