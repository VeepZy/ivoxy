"use client";

import { useDataStore } from "@/hooks/use-data";

import { Playlist } from "./playlist";

const PlaylistContainer: React.FC = () => {
    const { playlists } = useDataStore();

    return playlists.map((playlist) => (
        <Playlist key={playlist.id} playlist={playlist} />
    ));
};

export { PlaylistContainer };
