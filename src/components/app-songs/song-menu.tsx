import { MoreVerticalIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Song, type SongData } from "@/db/types";
import { useDataStore } from "@/hooks/use-data";
import { isSavedSong } from "@/utils/filter";

import { DropdownMenuAddSong } from "./song-menu-add";
import { DropdownMenuAddToCurrent } from "./song-menu-current";
import { DropdownMenuDeleteFromPlaylist } from "./song-menu-delete";
import { DropdownMenuAddToPlaylist } from "./song-menu-playlist";
import { DropdownMenuRemove } from "./song-menu-remove";

const SongMenu: React.FC<{ song: Song | SongData }> = ({ song }) => {
    const { songs } = useDataStore();

    const isSong = typeof song === "object" && "data" in song;
    const data = isSong ? song.data : song;

    const isSaved = isSavedSong(songs, data.url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreVerticalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-72"
                onClick={(event) => event.stopPropagation()}
            >
                <DropdownMenuAddSong isSaved={isSaved} song={data} />
                <DropdownMenuAddToCurrent song={data} />
                <DropdownMenuAddToPlaylist song={data} />
                <DropdownMenuDeleteFromPlaylist song={data} />
                {isSaved ? (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuRemove song={song as Song} />
                    </>
                ) : null}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { SongMenu };
