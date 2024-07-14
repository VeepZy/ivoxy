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

    const data = usePlayerStore((store) => store.data);
    const index = usePlayerStore((store) => store.index);

    useEffect(() => {
        if (!data) {
            setExisting(false);
            return;
        }

        if (filterSongs(songs, data[index].url)) {
            setExisting(true);
        } else {
            setExisting(false);
        }
    }, [data, index, songs]);

    const onSubmit = () => {
        if (data) {
            startTransition(async () => {
                await addSong(data[index]);
                setExisting(true);
            });
        }
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
