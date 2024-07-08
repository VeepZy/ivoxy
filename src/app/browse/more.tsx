"use client";

import { useTransition } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import { type youtube_v3 as Youtube } from "googleapis";
import { addSong } from "@/features/player/api/add-song";

const BrowseMoreButton: React.FC<{
    song: Youtube.Schema$SearchResult;
}> = ({ song }) => {
    const [pending, startTransition] = useTransition();

    const onAdd = () => {
        startTransition(async () => {
            await addSong({
                title: song.snippet?.title ?? "",
                channelTitle: song.snippet?.channelTitle ?? "",
                url: `https://www.youtube.com/embed/${song.id?.videoId}`,
                thumbnail: song.snippet?.thumbnails?.medium?.url ?? "",
            });
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVerticalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem
                    disabled={pending}
                    onClick={() => onAdd()}
                >
                    Add Song
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { BrowseMoreButton };
