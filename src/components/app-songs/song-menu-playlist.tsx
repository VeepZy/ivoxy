"use client";

import { ListPlusIcon, LoaderCircleIcon } from "lucide-react";

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
import { useTransition, MouseEvent } from "react";
import { useToast } from "../ui/use-toast";

const DropdownMenuAddToPlaylist: React.FC<{ song: SongData }> = ({
    song,
}) => {
    const [pending, startTransition] = useTransition();

    const { playlists } = useDataStore();
    const { toast } = useToast();

    const filtered = filterPlaylists(playlists, song.url);

    const onSubmit = (
        event: MouseEvent<HTMLDivElement>,
        playlist: Playlist,
    ) => {
        event.preventDefault();

        startTransition(async () => {
            const newData = [...playlist.data, { ...song }];
            const newArray = { ...playlist, data: newData };

            await updatePlaylist(newArray);

            toast({
                title: "Success",
                description: `${song.title} added to ${playlist.name}`,
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
                <ListPlusIcon className="mr-2 h-5 w-5" />
                Add to Playlist
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {filtered.map((playlist) => (
                        <DropdownMenuItem
                            key={playlist.id}
                            disabled={pending}
                            className="hover:cursor-pointer hover:bg-secondary"
                            onClick={(event) => onSubmit(event, playlist)}
                        >
                            {playlist.name}
                            {pending && (
                                <LoaderCircleIcon className="ml-auto h-5 w-5 animate-spin text-primary" />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
};

export { DropdownMenuAddToPlaylist };
