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

import { DropdownMenuAddToCurrent } from "./song-menu-current";
import { DropdownMenuAddToPlaylist } from "./song-menu-playlist";
import { DropdownMenuRemove } from "./song-menu-remove";
import { DropdownMenuAddSong } from "./song-menu-add";

const SongMenu: React.FC<{ song: Song | SongData }> = ({ song }) => {
    const { songs } = useDataStore();

    const isSong = typeof song === "object" && "data" in song;
    const data = isSong ? song.data : song;

    const isSaved = isSavedSong(songs, data.url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVerticalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72">
                <DropdownMenuAddSong song={data} isSaved={isSaved} />
                <DropdownMenuAddToCurrent song={data} />
                <DropdownMenuAddToPlaylist song={data} />
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
