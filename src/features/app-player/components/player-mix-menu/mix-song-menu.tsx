import { MoreVerticalIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AppPlayerMixSongMenuPlaylist } from "./mix-song-menu-playlist";
import { SongData } from "@/db/types";
import { AppPlayerMixSongMenuRemove } from "./mix-song-menu-remove";
import { AppPlayerMixSongMenuAddSong } from "./mix-song-menu-add";

const AppPlayerMixSongMenu: React.FC<{
    song: SongData;
    index: number;
}> = ({ song, index }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                    className="flex-shrink-0"
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
