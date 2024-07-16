"use client";

import { type NextPage } from "next";

import { PlayPlaylistButton } from "@/components/app-playlists/playlist-play";
import { PlaylistCompact } from "@/components/app-playlists/playlist-compact";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDataStore } from "@/hooks/use-data";

const PlaylistRoute: NextPage<{ params: { id: string } }> = ({
    params,
}) => {
    const { playlists } = useDataStore();
    const playlist = playlists.find((p) => p.id === Number(params.id));

    if (!playlist) {
        return <div>Playlist not found</div>;
    }

    return (
        <div className="flex flex-col gap-4 py-6">
            <div className="flex items-center justify-between px-6">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        {playlist.name}
                    </h2>
                    <p className="text-muted-foreground">
                        Includes {playlist.data.length} songs.
                    </p>
                </div>

                <PlayPlaylistButton playlist={playlist.data} />
            </div>

            <ScrollArea className="max-h-full overflow-y-auto px-3">
                {playlist.data.map((item) => (
                    <PlaylistCompact key={item.title} song={item} />
                ))}
            </ScrollArea>
        </div>
    );
};

export default PlaylistRoute;
