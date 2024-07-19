"use client";

import Image from "next/image";

import { UnescapedTitle } from "@/features/unescaped-title/components";
import { usePlayerStore } from "@/stores/player";

const AppPlayerData = () => {
    const data = usePlayerStore((store) => store.data);
    const index = usePlayerStore((store) => store.currentIndex);
    const song = data?.[index];

    if (!song) {
        return null;
    }

    return (
        <div className="hidden md:flex md:items-center md:gap-2">
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
                    className="text-sm leading-tight"
                    title={song.title}
                />
                <p className="text-xs text-muted-foreground">
                    {song.channelTitle}
                </p>
            </div>
        </div>
    );
};

export { AppPlayerData };
