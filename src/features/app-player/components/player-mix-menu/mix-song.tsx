import { SongData } from "@/db/types";
import Image from "next/image";
import { UnescapedTitle } from "@/features/unescaped-title/components";
import { AppPlayerMixSongMenu } from "./mix-song-menu";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/stores/player";
import { AudioLinesIcon } from "../audio-icon";

const AppPlayerMixMenuSong: React.FC<{
    song: SongData;
    index: number;
}> = ({ song, index }) => {
    const isPlaying = usePlayerStore((store) => store.isPlaying);
    const currentIndex = usePlayerStore((store) => store.currentIndex);
    const setCurrentIndex = usePlayerStore(
        (store) => store.setCurrentIndex,
    );

    const isCurrentPlaying = isPlaying && index === currentIndex;

    return (
        <li
            onClick={() => setCurrentIndex(index)}
            className={cn(
                "grid grid-cols-[40px_1fr_auto] items-center gap-3 rounded-sm border px-3 py-2 hover:cursor-pointer hover:bg-secondary",
                index === currentIndex
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
                <AppPlayerMixSongMenu song={song} index={index} />
            </div>
        </li>
    );
};

export { AppPlayerMixMenuSong };
