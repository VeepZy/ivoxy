"use client";

import { LayoutGridIcon, ListMusicIcon, Music2Icon } from "lucide-react";
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
        <div className="hidden pb-20 lg:block">
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Discover
                    </h2>
                    <div className="space-y-1">
                        <Button
                            className="w-full justify-start"
                            variant={
                                pathname === "/listen"
                                    ? "secondary"
                                    : "ghost"
                            }
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
                            className="w-full justify-start"
                            variant={
                                pathname === "/browse"
                                    ? "secondary"
                                    : "ghost"
                            }
                        >
                            <Link href="/browse">
                                <LayoutGridIcon className="mr-2 mt-0.5 h-4 w-4" />
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
                            variant={
                                pathname === "/playlists"
                                    ? "secondary"
                                    : "ghost"
                            }
                        >
                            <Link href="/playlists">
                                <ListMusicIcon className="mr-2 mt-0.5 h-4 w-4" />
                                Playlists
                            </Link>
                        </Button>
                        <Button
                            asChild
                            className="w-full justify-start"
                            variant={
                                pathname === "/songs"
                                    ? "secondary"
                                    : "ghost"
                            }
                        >
                            <Link href="/songs">
                                <Music2Icon className="mr-2 mt-0.5 h-4 w-4" />
                                Songs
                            </Link>
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
                                    asChild
                                    className="w-full justify-start"
                                    variant={
                                        pathname ===
                                        `/playlists/${playlist.id}`
                                            ? "secondary"
                                            : "ghost"
                                    }
                                >
                                    <Link
                                        href={`/playlists/${playlist.id}`}
                                    >
                                        <ListMusicIcon className="mr-2 mt-0.5 h-4 w-4" />
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
