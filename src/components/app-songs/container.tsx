"use client";

import { useDataStore } from "@/hooks/use-data";

import { Song } from "./song";

const SongsContainer: React.FC = () => {
    const { songs } = useDataStore();

    return songs.map((song) => <Song key={song.id} song={song} />);
};

export { SongsContainer };
