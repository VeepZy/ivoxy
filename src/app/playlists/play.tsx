"use client";

import { PlayIcon } from "lucide-react";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { type Database } from "@/db/schema";
import { PlayerContext } from "@/features/player/components/context";

type Playlist = Database["public"]["Tables"]["playlists"]["Row"];

const PlayPlaylist: React.FC<{ playlist: Playlist }> = ({ playlist }) => {
    const { setUrl } = useContext(PlayerContext);

    return (
        <Button
            className="absolute inset-0 bottom-0 left-0 right-0 top-0 z-10 h-full hover:bg-transparent"
            variant="ghost"
            onClick={() => {
                setUrl(playlist.urls);
            }}
        >
            <span className="sr-only">Play</span>
            <PlayIcon className="opacity-0 group-hover:opacity-100" />
        </Button>
    );
};

export { PlayPlaylist };
