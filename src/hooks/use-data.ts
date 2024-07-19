"use client";

import { useContext } from "react";

import { DataContext } from "@/features/context-data/stores/context";

const useDataStore = () => {
    const store = useContext(DataContext);

    if (!store) {
        throw new Error("useDataStore must be used within a DataProvider");
    }

    const user = store((state) => state.user);
    const songs = store((state) => state.songs);
    const playlists = store((state) => state.playlists);

    return { user, songs, playlists };
};

export { useDataStore };
