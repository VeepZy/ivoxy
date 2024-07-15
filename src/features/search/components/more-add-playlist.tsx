"use client";

import { useTransition } from "react";

import { SongData, type Playlist, type Song } from "@/db/types";
import { updatePlaylist } from "@/features/player/api/update-playlist";
import { filter } from "@/features/player/util/filter";

import {
    DropdownMenuItem,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

const AddToPlaylist: React.FC<{
    playlists: Playlist[];
    song: SongData;
}> = ({ playlists, song }) => {
    const [pending, startTransition] = useTransition();

    const filtered = filter(playlists, song.url);

    const onSubmit = (item: Playlist) =>
        startTransition(async () => {
            await updatePlaylist({
                ...item,
                data: [...item.data, { ...song }],
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
