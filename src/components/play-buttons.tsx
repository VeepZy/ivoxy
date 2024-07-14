"use client";

import { PlayIcon } from "lucide-react";
import { forwardRef } from "react";

import type { PlaylistData, SongData } from "@/db/types";
import {
    addPlaylistToCurrent,
    addSongToCurrent,
    setPlaylist,
    setSong,
} from "@/hooks/player";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

interface PlaySongButtonProps
    extends React.HTMLAttributes<HTMLButtonElement> {
    song: SongData;
    keep?: boolean;
}

const PlaySongButton = forwardRef<HTMLButtonElement, PlaySongButtonProps>(
    ({ className, song, keep = false }, ref) => {
        const onSubmit = () => {
            if (keep) {
                addSongToCurrent(song);
            } else {
                setSong(song);
            }
        };

        return (
            <Button
                ref={ref}
                className={cn("group-hover:bg-primary", className)}
                size="icon"
                variant="ghost"
                onClick={onSubmit}
            >
                <span className="sr-only">Play</span>
                <PlayIcon className="h-5 w-5" />
            </Button>
        );
    },
);

PlaySongButton.displayName = "PlaySongButton";

interface PlayPlaylistButtonProps
    extends React.HTMLAttributes<HTMLButtonElement> {
    playlist: PlaylistData;
    keep?: boolean;
}

const PlayPlaylistButton = forwardRef<
    HTMLButtonElement,
    PlayPlaylistButtonProps
>(({ className, playlist, keep = false }, ref) => {
    const onSubmit = () => {
        if (keep) {
            addPlaylistToCurrent(playlist);
        } else {
            setPlaylist(playlist);
        }
    };

    return (
        <Button
            ref={ref}
            className={cn("group-hover:bg-primary", className)}
            size="icon"
            variant="ghost"
            onClick={onSubmit}
        >
            <span className="sr-only">Play</span>
            <PlayIcon className="h-5 w-5" />
        </Button>
    );
});

PlayPlaylistButton.displayName = "PlayPlaylistButton";

export { PlaySongButton, PlayPlaylistButton };
