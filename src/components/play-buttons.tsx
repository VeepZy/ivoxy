"use client";

import { PlayIcon } from "lucide-react";
import { forwardRef } from "react";

import type { PlaylistData, SongData } from "@/db/types";

import { Button } from "./ui/button";
import { usePlayerStore } from "@/hooks/player";
import { cn } from "@/lib/utils";

interface PlaySongButtonProps
    extends React.HTMLAttributes<HTMLButtonElement> {
    song: SongData;
    keep?: boolean;
}

const PlaySongButton = forwardRef<HTMLHeadingElement, PlaySongButtonProps>(
    ({ className, song, keep = false }, ref) => {
        const setUrl = usePlayerStore((store) => store.control.setUrl);

        return (
            <Button
                className={cn("group-hover:bg-primary", className)}
                size="icon"
                variant="ghost"
                onClick={() => setUrl([song], keep)}
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
    HTMLHeadingElement,
    PlayPlaylistButtonProps
>(({ className, playlist, keep = false }, ref) => {
    const setUrl = usePlayerStore((store) => store.control.setUrl);

    return (
        <Button
            className={cn("group-hover:bg-primary", className)}
            size="icon"
            variant="ghost"
            onClick={() => setUrl(playlist, keep, true)}
        >
            <span className="sr-only">Play</span>
            <PlayIcon className="h-5 w-5" />
        </Button>
    );
});

PlayPlaylistButton.displayName = "PlayPlaylistButton";

export { PlaySongButton, PlayPlaylistButton };
