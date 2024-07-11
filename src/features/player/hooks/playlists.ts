"use client";

import { useCallback, useEffect, useState } from "react";

import { type Playlist } from "@/db/types";
import { usePlayerStore } from "@/hooks/player";

import { filter } from "../util/filter";


const usePlaylists = (playlists: Playlist[]) => {
    const [current, setCurrent] = useState<Playlist[]>(playlists);
    const [selected, setSelected] = useState<string>("");

    const state = usePlayerStore((store) => store.state);

    const handleUpdate = useCallback(
        (playlists: Playlist[]) => {
            const filtered =
                playlists.length > 0
                    ? filter(playlists, state.data[state.index].url)
                    : playlists;

            setCurrent(filtered);

            if (filtered.length > 0) {
                setSelected(filtered[0].name);
            }
        },
        [state.data, state.index, setCurrent],
    );

    useEffect(() => {
        const filtered =
            playlists.length > 0
                ? filter(playlists, state.data[state.index].url)
                : playlists;

        setCurrent(filtered);

        if (filtered.length > 0) {
            setSelected(filtered[0].name);
        }
    }, [playlists, state.data, state.index, setCurrent]);

    return { state, current, selected, handleUpdate, setSelected };
};

export { usePlaylists };
