"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Song, SongData } from "@/db/types";
import { addSong } from "@/features/player/api/add-song";
import { useTransition } from "react";

const MoreAddSong: React.FC<{ song: SongData; songs: Song[] }> = ({
    song,
    songs,
}) => {
    const [pending, startTransition] = useTransition();

    const onSubmit = () => {
        startTransition(async () => {
            await addSong(song);
        });
    };

    const disabled = songs.some((item) => item.data.url === song.url);

    return (
        <DropdownMenuItem
            onClick={onSubmit}
            disabled={pending || disabled}
        >
            {disabled ? "Already Added" : "Add Song"}
        </DropdownMenuItem>
    );
};

export { MoreAddSong };
