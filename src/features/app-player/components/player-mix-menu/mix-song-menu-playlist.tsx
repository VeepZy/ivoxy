import { ListPlusIcon, LoaderCircleIcon } from "lucide-react";
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

const AppPlayerMixSongMenuPlaylist: React.FC<{ song: SongData }> = ({
    song,
}) => {
    const [pending, startTransition] = useTransition();

    const { playlists } = useDataStore();

    const filtered = filterPlaylists(playlists, song.url);

    const onSubmit = (
        event: MouseEvent<HTMLDivElement>,
        playlist: Playlist,
    ) => {
        event.preventDefault();

        startTransition(async () => {
            await updatePlaylist({
                ...playlist,
                data: [...playlist.data, { ...song }],
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

export { AppPlayerMixSongMenuPlaylist };
