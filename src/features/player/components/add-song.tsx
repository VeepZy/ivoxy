"use client";

import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { type Song } from "@/db/types";
import { usePlayerStore } from "@/hooks/player";

import { addSong } from "../api/add-song";
import { filterSongs } from "../util/filter";

const AddSong: React.FC<{ songs: Song[] }> = ({ songs }) => {
    const [existing, setExisting] = useState<boolean>(false);
    const [pending, startTransition] = useTransition();

    const state = usePlayerStore((store) => store.state);

    useEffect(() => {
        if (filterSongs(songs, state.data[state.index].url)) {
            setExisting(false);
        } else {
            setExisting(true);
        }
    }, [state.data, state.index, songs]);

    const onSubmit = () => {
        startTransition(async () => {
            await addSong(state.data[state.index]);
            setExisting(true);
        });
    };

    return (
        <Button
            disabled={pending || existing}
            variant="outline"
            onClick={onSubmit}
        >
            Add Song
        </Button>
    );
};

export { AddSong };
