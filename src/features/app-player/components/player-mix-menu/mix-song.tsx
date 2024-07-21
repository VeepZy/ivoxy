import Image from "next/image";

import { Button } from "@/components/ui/button";
import { type SongData } from "@/db/types";
import { UnescapedTitle } from "@/features/unescaped-title/components";
import { usePlayerStore } from "@/stores/player";

import { AudioLinesIcon } from "../../../../components/audio-icon";

import { AppPlayerMixSongMenu } from "./mix-song-menu";

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
        <li>
            <Button
                className="h-full w-full p-0"
                variant={isCurrentPlaying ? "secondary" : "ghost"}
                onClick={() => setCurrentIndex(index)}
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
                            limit={40}
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
                        <AppPlayerMixSongMenu song={song} />
                    </div>
                </div>
            </Button>
        </li>
        // <li
        //     className={cn(
        //         "grid grid-cols-[40px_1fr_auto] items-center gap-3 rounded-sm border px-3 py-2 hover:cursor-pointer hover:bg-secondary",
        //         index === currentIndex
        //             ? "bg-secondary/50"
        //             : "border-transparent",
        //     )}
        //     onClick={() => setCurrentIndex(index)}
        // >
        //     <div className="relative h-10 w-10 overflow-hidden rounded-md border-2 border-foreground drop-shadow-md">
        //         <Image
        //             alt={song.title}
        //             className="aspect-square object-cover transition-all hover:scale-105"
        //             height={120}
        //             src={song.thumbnail}
        //             width={320}
        //         />
        //     </div>
        //     <div>
        //         <UnescapedTitle
        //             className="text-xs tracking-tight"
        //             title={song.title}
        //         />
        //         <p className="text-xs text-muted-foreground">
        //             {song.channelTitle}
        //         </p>
        //     </div>

        //     <div className="flex items-center gap-2">
        //         {isCurrentPlaying ? <AudioLinesIcon className="h-5 w-5" /> : null}
        //         <AppPlayerMixSongMenu index={index} song={song} />
        //     </div>
        // </li>
    );
};

export { AppPlayerMixMenuSong };
