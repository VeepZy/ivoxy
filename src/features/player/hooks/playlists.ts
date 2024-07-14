"use client";

import { useCallback, useEffect, useState } from "react";

import { type Playlist } from "@/db/types";
import { usePlayerStore } from "@/hooks/player";

import { filter } from "../util/filter";

const usePlaylists = (playlists: Playlist[]) => {
    const [current, setCurrent] = useState<Playlist[]>(playlists);
    const [selected, setSelected] = useState<string>("");

    const data = usePlayerStore((store) => store.data);
    const index = usePlayerStore((store) => store.index);

    const handleUpdate = useCallback(
        (playlists: Playlist[]) => {
            const filtered =
                playlists.length > 0
                    ? filter(playlists, data?.[index].url ?? "")
                    : playlists;

            setCurrent(filtered);

            if (filtered.length > 0) {
                setSelected(filtered[0].name);
            }
        },
        [data, index, setCurrent],
    );

    useEffect(() => {
        const filtered =
            playlists.length > 0
                ? filter(playlists, data?.[index].url ?? "")
                : playlists;

        setCurrent(filtered);

        if (filtered.length > 0) {
            setSelected(filtered[0].name);
        }
    }, [playlists, data, index, setCurrent]);

    return { data, index, current, selected, handleUpdate, setSelected };
};

export { usePlaylists };
