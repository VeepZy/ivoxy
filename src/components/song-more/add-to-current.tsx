"use client";

import { type Song } from "@/db/types";
import { addSongToCurrent } from "@/hooks/player";

import { DropdownMenuItem } from "../ui/dropdown-menu";

const AddToCurrentSongs: React.FC<{ song: Song }> = ({ song }) => {
    return (
        <DropdownMenuItem onClick={() => addSongToCurrent(song.data)}>
            Add to current
        </DropdownMenuItem>
    );
};

export { AddToCurrentSongs };
