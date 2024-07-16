import { MoreVerticalIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Song } from "@/db/types";
import { useDataStore } from "@/hooks/use-data";
import { isSavedSong } from "@/utils/filter";

import { DropdownMenuAddToCurrent } from "./song-menu-current";
import { DropdownMenuAddToPlaylist } from "./song-menu-playlist";
import { DropdownMenuRemove } from "./song-menu-remove";

const SongMenu: React.FC<{ song: Song }> = ({ song }) => {
    const { songs } = useDataStore();

    const isSaved = isSavedSong(songs, song.data.url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVerticalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72">
                <DropdownMenuAddToCurrent song={song} />
                <DropdownMenuAddToPlaylist song={song} />
                {isSaved ? <>
                        <DropdownMenuSeparator />
                        <DropdownMenuRemove song={song} />
                    </> : null}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { SongMenu };
