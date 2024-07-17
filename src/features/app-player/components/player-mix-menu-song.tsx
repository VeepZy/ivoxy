import { SongData } from "@/db/types";
import Image from "next/image";
import { UnescapedTitle } from "@/features/unescaped-title/components";
import { PlayIcon } from "lucide-react";

const AppPlayerMixMenuSong: React.FC<{
    song?: SongData;
    index?: number;
}> = ({ song, index }) => {
    return (
        <li className="grid grid-cols-[40px_1fr_auto] items-center gap-3 rounded-sm bg-secondary px-3 py-2 hover:cursor-pointer">
            <div className="relative h-10 w-10 overflow-hidden rounded-md border-2 border-foreground drop-shadow-md">
                <Image
                    alt="Song title"
                    className="aspect-square object-cover transition-all hover:scale-105"
                    height={120}
                    src="/thumbnail-placeholder.jpg"
                    width={320}
                />
            </div>
            <div>
                <UnescapedTitle
                    title="Eminem - Love The Way You Lie ft. Rihanna"
                    className="text-sm"
                />
                <p className="text-xs text-muted-foreground">
                    Channel title
                </p>
            </div>

            <PlayIcon className="h-5 w-5" />
        </li>
    );
};

export { AppPlayerMixMenuSong };
