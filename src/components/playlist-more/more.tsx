"use client";

import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Playlist } from "@/db/types";

import { Dialog, DialogTrigger } from "../ui/dialog";

import { PlaylistRenameButton } from "./name";
import { PlaylistRemoveButton } from "./remove";

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
                    <DropdownMenuItem>
                        <Link href={`/playlists/${playlist.id}`}>
                            View
                        </Link>
                    </DropdownMenuItem>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuSeparator />
                    <PlaylistRemoveButton playlist={playlist} />
                </DropdownMenuContent>
            </DropdownMenu>
            <PlaylistRenameButton
                playlist={playlist}
                playlists={playlists}
                setOpen={setOpen}
            />
        </Dialog>
    );
};

export { PlaylistMoreButton };
