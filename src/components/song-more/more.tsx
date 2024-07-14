import { MoreVerticalIcon } from "lucide-react";

import { type Playlist, type Song } from "@/db/types";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { AddToCurrentSongs } from "./add-to-current";
import { AddToPlaylist } from "./playlist-add";
import { SongRemoveButton } from "./remove";

const SongMoreButton: React.FC<{ playlists: Playlist[]; song: Song }> = ({
    song,
    playlists,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVerticalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <AddToCurrentSongs song={song} />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        Add To Playlist
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <AddToPlaylist playlists={playlists} song={song} />
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <SongRemoveButton song={song} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { SongMoreButton };
