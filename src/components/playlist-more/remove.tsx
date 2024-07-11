"use client";

import { ClockArrowUpIcon } from "lucide-react";
import { useEffect, useTransition } from "react";

import { removePlaylist } from "@/db/actions";
import { type Playlist } from "@/db/types";
import { useRemoveStore } from "@/hooks/remove";

import { DropdownMenuItem } from "../ui/dropdown-menu";

const PlaylistRemoveButton: React.FC<{ playlist: Playlist }> = ({
    playlist,
}) => {
    const [pending, startTransition] = useTransition();

    const fill = useRemoveStore((state) => state.fill);
    const setIsHolding = useRemoveStore((state) => state.setIsHolding);
    const setFill = useRemoveStore((state) => state.setFill);
    const startTimeout = useRemoveStore((state) => state.startTimeout);
    const cleanUpTimeout = useRemoveStore((state) => state.cleanUpTimeout);

    const handleMouseDown = () => {
        setIsHolding(true);
        startTimeout();
    };

    const handleMouseUp = () => {
        setIsHolding(false);
        setFill(0);
        cleanUpTimeout();
    };

    useEffect(() => {
        if (fill === 100) {
            startTransition(async () => {
                await removePlaylist(playlist);
            });
        }
    }, [fill, playlist]);

    useEffect(() => {
        return () => cleanUpTimeout();
    }, [cleanUpTimeout]);

    return (
        <DropdownMenuItem
            className="relative flex justify-between text-destructive"
            disabled={pending}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div
                className="absolute bottom-0 left-0 top-0 z-10 rounded-sm bg-primary/50 "
                style={{ width: `${fill}%` }}
            />
            Remove
            <ClockArrowUpIcon className="h-4 w-4" />
        </DropdownMenuItem>
    );
};

export { PlaylistRemoveButton };
