import {
    ListCollapseIcon,
    ListMinusIcon,
    MoreVerticalIcon,
} from "lucide-react";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Playlist } from "@/db/types";

import { Dialog, DialogTrigger } from "../ui/dialog";

import { DropdownMenuAddToCurrent } from "./playlist-menu-current";
import { DropdownMenuRemove } from "./playlist-menu-remove";
import { DropdownMenuDialogRename } from "./playlist-menu-rename";

const PlaylistMenu: React.FC<{ playlist: Playlist }> = ({ playlist }) => {
    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVerticalIcon className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72">
                    <DropdownMenuItem asChild>
                        <Link href={`/playlists/${playlist.id}`}>
                            <ListCollapseIcon className="mr-2 h-5 w-5" />
                            View
                        </Link>
                    </DropdownMenuItem>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                            <ListMinusIcon className="mr-2 h-5 w-5" />
                            Rename
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuAddToCurrent data={playlist.data} />

                    <DropdownMenuSeparator />
                    <DropdownMenuRemove playlist={playlist} />
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenuDialogRename playlist={playlist} />
        </Dialog>
    );
};

export { PlaylistMenu };
