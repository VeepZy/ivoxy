"use client";

import { PlayIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type PlaylistData } from "@/db/types";
import { usePlayerStore } from "@/stores/player";

const PlayPlaylistButton: React.FC<{ playlist: PlaylistData }> = ({
    playlist,
}) => {
    const setData = usePlayerStore((store) => store.setData);

    return (
        <Button
            className="group-hover:bg-primary"
            size="icon"
            variant="ghost"
            onClick={() => setData(playlist)}
        >
            <span className="sr-only">Play</span>
            <PlayIcon className="h-5 w-5" />
        </Button>
    );
};

export { PlayPlaylistButton };
