import { MoreVerticalIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type SongData } from "@/db/types";

import { AppPlayerMixSongMenuAddSong } from "./mix-song-menu-add";
import { AppPlayerMixSongMenuPlaylist } from "./mix-song-menu-playlist";
import { AppPlayerMixSongMenuRemove } from "./mix-song-menu-remove";

const AppPlayerMixSongMenu: React.FC<{
    song: SongData;
}> = ({ song }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreVerticalIcon className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
                <AppPlayerMixSongMenuAddSong song={song} />
                <AppPlayerMixSongMenuRemove song={song} />
                <AppPlayerMixSongMenuPlaylist song={song} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export { AppPlayerMixSongMenu };
