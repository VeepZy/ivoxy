"use client";

import Image from "next/image";

import { type SongData } from "@/db/types";
import { UnescapedTitle } from "@/features/unescaped-title/components";

import { PlaySongButton } from "../app-songs/song-play";
import { usePlayerStore } from "@/stores/player";
import { cn } from "@/lib/utils";
import { AudioLinesIcon } from "../audio-icon";
import { SongMenu } from "../app-songs/song-menu";

const PlaylistCompact: React.FC<{ song: SongData }> = ({ song }) => {
    const data = usePlayerStore((store) => store.data);
    const isPlaying = usePlayerStore((store) => store.isPlaying);
    const index = usePlayerStore((store) => store.currentIndex);
    const setData = usePlayerStore((store) => store.setData);

    const isCurrentPlaying = isPlaying && data?.[index]?.url === song.url;

    return (
        <li
            onClick={() => setData([song])}
            className={cn(
                "grid grid-cols-[40px_1fr_auto] items-center gap-3 rounded-sm border px-3 py-2 hover:cursor-pointer hover:bg-secondary",
                isCurrentPlaying
                    ? "bg-secondary/50"
                    : "border-transparent",
            )}
        >
            <div className="relative h-10 w-10 overflow-hidden rounded-md border-2 border-foreground drop-shadow-md">
                <Image
                    alt={song.title}
                    className="aspect-square object-cover transition-all hover:scale-105"
                    height={120}
                    src={song.thumbnail}
                    width={320}
                />
            </div>
            <div>
                <UnescapedTitle
                    title={song.title}
                    className="text-xs tracking-tight"
                />
                <p className="text-xs text-muted-foreground">
                    {song.channelTitle}
                </p>
            </div>

            <div className="flex items-center gap-2">
                {isCurrentPlaying && (
                    <AudioLinesIcon className="h-5 w-5" />
                )}
                <SongMenu song={song} />
            </div>
        </li>
    );
};

export { PlaylistCompact };
