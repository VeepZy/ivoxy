"use client";

import { ListMinusIcon, LoaderCircleIcon } from "lucide-react";
import { type MouseEvent, useTransition } from "react";

import {
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { updatePlaylist } from "@/db/actions";
import { type Playlist, type SongData } from "@/db/types";
import { useDataStore } from "@/hooks/use-data";
import { cn } from "@/lib/utils";
import { filterPlaylists } from "@/utils/filter";

import { useToast } from "../ui/use-toast";

const DropdownMenuDeleteFromPlaylist: React.FC<{ song: SongData }> = ({
    song,
}) => {
    const [pending, startTransition] = useTransition();

    const { playlists } = useDataStore();
    const { toast } = useToast();

    const filtered = filterPlaylists(playlists, song.url, true);

    const onSubmit = (
        event: MouseEvent<HTMLDivElement>,
        playlist: Playlist,
    ) => {
        event.preventDefault();

        startTransition(async () => {
            const newData = playlist.data.filter(
                (data) => data.url !== song.url,
            );

            const newArray = { ...playlist, data: newData };

            await updatePlaylist(newArray);

            toast({
                title: "Success",
                description: `${song.title} removed from ${playlist.name}`,
            });
        });
    };

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger
                disabled={filtered.length === 0}
                className={cn(
                    filtered.length === 0 && "text-muted-foreground",
                )}
            >
                <ListMinusIcon className="mr-2 h-5 w-5" />
                Delete from Playlist
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {filtered.map((playlist) => (
                        <DropdownMenuItem
                            key={playlist.id}
                            className="hover:cursor-pointer hover:bg-secondary"
                            disabled={pending}
                            onClick={(event) => onSubmit(event, playlist)}
                        >
                            {playlist.name}
                            {pending ? <LoaderCircleIcon className="ml-auto h-5 w-5 animate-spin text-primary" /> : null}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
};

export { DropdownMenuDeleteFromPlaylist };
