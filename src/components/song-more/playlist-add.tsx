"use client";

import { useTransition } from "react";

import { type Playlist, type Song } from "@/db/types";
import { updatePlaylist } from "@/features/player/api/update-playlist";
import { filter } from "@/features/player/util/filter";

import {
    DropdownMenuItem,
    DropdownMenuSubContent,
} from "../ui/dropdown-menu";

const AddToPlaylist: React.FC<{ playlists: Playlist[]; song: Song }> = ({
    playlists,
    song,
}) => {
    const [pending, startTransition] = useTransition();

    const filtered = filter(playlists, song.data.url);

    const onSubmit = (item: Playlist) =>
        startTransition(async () => {
            await updatePlaylist({
                ...item,
                data: [...item.data, { ...song.data }],
            });
        });

    return (
        <DropdownMenuSubContent>
            {filtered.length > 0 ? (
                filtered.map((item) => (
                    <DropdownMenuItem
                        key={item.id}
                        disabled={pending}
                        onClick={() => onSubmit(item)}
                    >
                        {item.name}
                    </DropdownMenuItem>
                ))
            ) : (
                <DropdownMenuItem>No playlists found</DropdownMenuItem>
            )}
        </DropdownMenuSubContent>
    );
};

export { AddToPlaylist };
