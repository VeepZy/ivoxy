"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { SongData } from "@/db/types";
import { addSongToCurrent, usePlayerStore } from "@/hooks/player";

const AddToCurrentSongs: React.FC<{ song: SongData }> = ({ song }) => {
    const data = usePlayerStore((store) => store.data);
    const disabled = data?.some((item) => item.url === song.url);

    return (
        <DropdownMenuItem
            disabled={disabled}
            onClick={() => addSongToCurrent(song)}
        >
            Add to current
        </DropdownMenuItem>
    );
};

export { AddToCurrentSongs };
