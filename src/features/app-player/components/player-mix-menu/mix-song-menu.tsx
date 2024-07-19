import { MoreVerticalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    index: number;
}> = ({ song, index }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="flex-shrink-0"
                    size="icon"
                    variant="outline"
                >
                    <MoreVerticalIcon className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
                <AppPlayerMixSongMenuAddSong song={song} />
                <AppPlayerMixSongMenuRemove index={index} />
                <AppPlayerMixSongMenuPlaylist song={song} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export { AppPlayerMixSongMenu };
