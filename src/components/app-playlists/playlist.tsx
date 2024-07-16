import Image from "next/image";

import type { Playlist } from "@/db/types";
import { UnescapedTitle } from "@/features/unescaped-title/components";

import { PlaylistMenu } from "./playlist-menu";
import { PlayPlaylistButton } from "./playlist-play";

const Playlist: React.FC<{ playlist: Playlist }> = ({ playlist }) => {
    return (
        <div className="w-[320px] space-y-3">
            <div className="group relative overflow-hidden rounded-md border-2 border-foreground drop-shadow-md">
                <Image
                    alt={playlist.name}
                    className="aspect-square h-[180px] w-[320px] object-cover transition-all hover:scale-105"
                    height={180}
                    width={320}
                    src={
                        playlist.image_src ?? "/thumbnail-placeholder.jpg"
                    }
                />

                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-all group-hover:cursor-pointer group-hover:opacity-100">
                    <PlayPlaylistButton playlist={playlist.data} />
                </div>
            </div>

            <div className="flex items-center">
                <div className="flex-1 space-y-1 text-sm">
                    <UnescapedTitle title={playlist.name} />
                    <p className="text-xs text-muted-foreground">
                        {playlist.data.length} songs
                    </p>
                </div>
                <PlaylistMenu playlist={playlist} />
            </div>
        </div>
    );
};

export { Playlist };
