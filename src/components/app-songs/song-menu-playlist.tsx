import { ListPlusIcon } from "lucide-react";

import {
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { updatePlaylist } from "@/db/actions";
import { type Playlist, type Song } from "@/db/types";
import { useDataStore } from "@/hooks/use-data";
import { cn } from "@/lib/utils";
import { filterPlaylists } from "@/utils/filter";

const DropdownMenuAddToPlaylist: React.FC<{ song: Song }> = ({ song }) => {
    const { playlists } = useDataStore();

    const filtered = filterPlaylists(playlists, song.data.url);

    const onSubmit = async (playlist: Playlist) =>
        await updatePlaylist({
            ...playlist,
            data: [...playlist.data, { ...song.data }],
        });

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
                            onClick={() => onSubmit(playlist)}
                        >
                            {playlist.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
};

export { DropdownMenuAddToPlaylist };
