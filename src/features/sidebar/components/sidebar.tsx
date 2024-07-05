"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Database } from "@/db/schema";
import { cn } from "@/lib/utils";

type Playlist = Database["public"]["Tables"]["playlists"]["Row"];

const Sidebar: React.FC<{ playlists: Playlist[] }> = ({ playlists }) => {
    const pathname = usePathname();

    return (
        <div className="hidden pb-12 lg:block">
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Discover
                    </h2>
                    <div className="space-y-1">
                        <Button
                            className="w-full justify-start"
                            variant="secondary"
                        >
                            <svg
                                className="mr-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="10 8 16 12 10 16 10 8" />
                            </svg>
                            Listen Now
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            className={cn("w-full justify-start", {
                                "text-destructive hover:text-destructive":
                                    pathname === "/browse",
                            })}
                        >
                            <Link href="/browse">
                                <svg
                                    className="mr-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        height="7"
                                        rx="1"
                                        width="7"
                                        x="3"
                                        y="3"
                                    />
                                    <rect
                                        height="7"
                                        rx="1"
                                        width="7"
                                        x="14"
                                        y="3"
                                    />
                                    <rect
                                        height="7"
                                        rx="1"
                                        width="7"
                                        x="14"
                                        y="14"
                                    />
                                    <rect
                                        height="7"
                                        rx="1"
                                        width="7"
                                        x="3"
                                        y="14"
                                    />
                                </svg>
                                Browse
                            </Link>
                        </Button>
                        <Button
                            className="w-full justify-start"
                            variant="ghost"
                        >
                            <svg
                                className="mr-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                            </svg>
                            Radio
                        </Button>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Library
                    </h2>
                    <div className="space-y-1">
                        <Button
                            asChild
                            className="w-full justify-start"
                            variant="ghost"
                        >
                            <Link href="/playlists">
                                <svg
                                    className="mr-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M21 15V6" />
                                    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                    <path d="M12 12H3" />
                                    <path d="M16 6H3" />
                                    <path d="M12 18H3" />
                                </svg>
                                Playlists
                            </Link>
                        </Button>
                        <Button
                            className="w-full justify-start"
                            variant="ghost"
                        >
                            <svg
                                className="mr-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="8" cy="18" r="4" />
                                <path d="M12 18V2l7 4" />
                            </svg>
                            Songs
                        </Button>
                        <Button
                            className="w-full justify-start"
                            variant="ghost"
                        >
                            <svg
                                className="mr-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            Made for You
                        </Button>
                        <Button
                            className="w-full justify-start"
                            variant="ghost"
                        >
                            <svg
                                className="mr-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                                <circle cx="17" cy="7" r="5" />
                            </svg>
                            Artists
                        </Button>
                        <Button
                            className="w-full justify-start"
                            variant="ghost"
                        >
                            <svg
                                className="mr-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="m16 6 4 14" />
                                <path d="M12 6v14" />
                                <path d="M8 8v12" />
                                <path d="M4 4v16" />
                            </svg>
                            Albums
                        </Button>
                    </div>
                </div>
                <div className="py-2">
                    <h2 className="relative px-7 text-lg font-semibold tracking-tight">
                        Playlists
                    </h2>
                    <ScrollArea className="h-[300px] px-1">
                        <div className="space-y-1 p-2">
                            {playlists.map((playlist) => (
                                <Button
                                    key={playlist.id}
                                    className="w-full justify-start font-normal"
                                    variant="ghost"
                                    asChild
                                >
                                    <Link
                                        href={`/playlists/${playlist.id}`}
                                    >
                                        <svg
                                            className="mr-2 h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M21 15V6" />
                                            <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                            <path d="M12 12H3" />
                                            <path d="M16 6H3" />
                                            <path d="M12 18H3" />
                                        </svg>
                                        {playlist.name}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};

export { Sidebar };
