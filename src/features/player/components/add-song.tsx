"use client";

import { useContext, useEffect, useState, useTransition } from "react";
import { PlayerContext } from "./context";
import { Button } from "@/components/ui/button";
import { addSong } from "../api/add-song";
import { Song } from "@/db/types";

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
    }, [state.data, state.index]);

    const onSubmit = () => {
        startTransition(async () => {
            await addSong(state.data[state.index]);
        });
    };

    return (
        <Button
            variant="outline"
            disabled={pending || existing}
            onClick={onSubmit}
        >
            Add Song
        </Button>
    );
};

export { AddSong };
