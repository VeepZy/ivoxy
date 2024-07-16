import Image from "next/image";

import { type SongData } from "@/db/types";
import { UnescapedTitle } from "@/features/unescaped-title/components";

import { PlaySongButton } from "../app-songs/song-play";

const PlaylistCompact: React.FC<{ song: SongData }> = ({ song }) => {
    return (
        <div className="grid grid-cols-[72px_1fr_auto] items-center gap-4 rounded-md p-3 hover:cursor-pointer hover:bg-secondary">
            <div className="group relative overflow-hidden rounded-md border-2 border-foreground drop-shadow-md">
                <Image
                    alt={song.title}
                    className=" aspect-square h-auto w-auto object-cover transition-all hover:scale-105"
                    height={120}
                    src={song.thumbnail}
                    width={312}
                />
            </div>
            <div className="grid gap-1">
                <UnescapedTitle title={song.title} />
                <p className="text-xs text-muted-foreground">
                    {song.channelTitle}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <PlaySongButton song={song} />
            </div>
        </div>
    );
};

export { PlaylistCompact };
