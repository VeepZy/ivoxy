"use client";

import { PlayIcon } from "lucide-react";
import { useContext } from "react";

import type { PlaylistData, SongData } from "@/db/types";
import { PlayerContext } from "@/features/player/components/context";

import { Button } from "./ui/button";

const SongPlayButton: React.FC<{ song: SongData; keep?: boolean }> = ({
    song,
    keep = false,
}) => {
    const { state, setUrl } = useContext(PlayerContext);

    const handlePlay = () => {
        if (keep) {
            setUrl([...state.data, song]);
        } else {
            setUrl([song]);
        }
    };

    return (
        <Button
            size="icon"
            variant="ghost"
            onClick={handlePlay}
            className="group-hover:bg-primary"
        >
            <span className="sr-only">Play</span>
            <PlayIcon className="h-5 w-5" />
        </Button>
    );
};

const PlaylistPlayButton: React.FC<{ playlist: PlaylistData }> = ({
    playlist,
}) => {
    const { setUrl } = useContext(PlayerContext);

    const handlePlay = () => {
        setUrl(playlist);
    };

    return (
        <Button
            size="icon"
            variant="ghost"
            onClick={handlePlay}
            className="group-hover:bg-primary"
        >
            <span className="sr-only">Play</span>
            <PlayIcon className="h-5 w-5" />
        </Button>
    );
};

export { SongPlayButton, PlaylistPlayButton };
