"use client";

import { useContext, useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { type Song } from "@/db/types";

import { addSong } from "../api/add-song";

import { PlayerContext } from "./context";

const AddSong: React.FC<{ songs: Song[] }> = ({ songs }) => {
    const [existing, setExisting] = useState<boolean>(false);
    const [pending, startTransition] = useTransition();
    const { state } = useContext(PlayerContext);

    useEffect(() => {
        if (
            songs.some(
                (song) => song.data.url === state.data[state.index].url,
            )
        ) {
            setExisting(true);
        } else {
            setExisting(false);
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
