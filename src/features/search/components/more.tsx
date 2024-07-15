import { MoreVerticalIcon } from "lucide-react";

import { Song, SongData, type Playlist } from "@/db/types";

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
} from "@/components/ui/dropdown-menu";
import { AddToCurrentSongs } from "./more-add-current";
import { AddToPlaylist } from "./more-add-playlist";
import { MoreAddSong } from "./more-add-song";

const BrowseMoreButton: React.FC<{
    playlists: Playlist[];
    songs: Song[];
    song: SongData;
}> = ({ song, playlists, songs }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVerticalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <MoreAddSong song={song} songs={songs} />
                <AddToCurrentSongs song={song} />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        Add To Playlist
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <AddToPlaylist playlists={playlists} song={song} />
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { BrowseMoreButton };
