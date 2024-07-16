"use client";

import Image from "next/image";

import type { Song } from "@/db/types";
import { UnescapedTitle } from "@/features/unescaped-title/components";

import { SongMenu } from "./song-menu";
import { PlaySongButton } from "./song-play";

const Song: React.FC<{ song: Song }> = ({ song }) => {
    return (
        <div className="w-[320px] space-y-3">
            <div className="group relative overflow-hidden rounded-md border-2 border-foreground drop-shadow-md">
                <Image
                    alt={song.data.title}
                    className="aspect-square h-[180px] w-[320px] object-cover transition-all hover:scale-105"
                    height={180}
                    src={song.data.thumbnail}
                    width={320}
                />

                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-all group-hover:cursor-pointer group-hover:opacity-100">
                    <PlaySongButton song={song.data} />
                </div>
            </div>

            <div className="flex items-center">
                <div className="flex-1 space-y-1 text-sm">
                    <UnescapedTitle title={song.data.title} />
                    <p className="text-xs text-muted-foreground">
                        {song.data.channelTitle}
                    </p>
                </div>
                <SongMenu song={song} />
            </div>
        </div>
    );
};

export { Song };
