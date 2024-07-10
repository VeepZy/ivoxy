"use client";

import { MoreVerticalIcon } from "lucide-react";
import { type Playlist } from "@/db/types";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlaylistRemoveButton } from "./remove";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { PlaylistRenameButton } from "./name";
import { useRef, useState } from "react";

const PlaylistMoreButton: React.FC<{
    playlists: Playlist[];
    playlist: Playlist;
}> = ({ playlists, playlist }) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVerticalIcon className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuSeparator />
                    <PlaylistRemoveButton playlist={playlist} />
                </DropdownMenuContent>
            </DropdownMenu>
            <PlaylistRenameButton
                playlists={playlists}
                playlist={playlist}
                setOpen={setOpen}
            />
        </Dialog>
    );
};

export { PlaylistMoreButton };
