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
        <div className="flex max-h-full flex-col">
            <div className="flex items-center justify-between p-6">
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

            <ScrollArea className="overflow-y-auto pb-6 pl-3 pr-6">
                <ul className="space-y-2">
                    {playlist.data.map((item, index) => (
                        <PlaylistCompact
                            key={`${index}-${item.title}`}
                            song={item}
                        />
                    ))}
                </ul>
            </ScrollArea>
        </div>
    );
};

export default PlaylistRoute;
