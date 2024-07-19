"use client";

import Image from "next/image";

import { type SongData } from "@/db/types";
import { UnescapedTitle } from "@/features/unescaped-title/components";
import { usePlayerStore } from "@/stores/player";

import { SongMenu } from "../app-songs/song-menu";
import { AudioLinesIcon } from "../audio-icon";
import { Button } from "../ui/button";

const PlaylistCompact: React.FC<{ song: SongData }> = ({ song }) => {
    const data = usePlayerStore((store) => store.data);
    const isPlaying = usePlayerStore((store) => store.isPlaying);
    const index = usePlayerStore((store) => store.currentIndex);
    const setData = usePlayerStore((store) => store.setData);

    const isCurrentPlaying = isPlaying && data?.[index]?.url === song.url;

    return (
        <li>
            <Button
                className="h-full w-full p-0"
                variant={isCurrentPlaying ? "secondary" : "ghost"}
                onClick={() => setData([song])}
            >
                <div className="grid w-full grid-cols-[40px_1fr_auto] items-center gap-3 rounded-sm px-3 py-2">
                    <div className="relative h-10 w-10 overflow-hidden rounded-md border-2 border-foreground drop-shadow-md">
                        <Image
                            alt={song.title}
                            className="aspect-square object-cover transition-all hover:scale-105"
                            height={120}
                            src={song.thumbnail}
                            width={320}
                        />
                    </div>
                    <div className="text-left">
                        <UnescapedTitle
                            className="text-xs tracking-tight"
                            title={song.title}
                        />
                        <p className="text-xs text-muted-foreground">
                            {song.channelTitle}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {isCurrentPlaying ? (
                            <AudioLinesIcon className="h-5 w-5" />
                        ) : null}
                        <SongMenu song={song} />
                    </div>
                </div>
            </Button>
        </li>
    );
};

export { PlaylistCompact };
