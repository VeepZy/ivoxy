"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { removePlaylist } from "@/db/actions";
import { Playlist } from "@/db/types";
import { ClockArrowUpIcon } from "lucide-react";

const PlaylistRemoveButton: React.FC<{ playlist: Playlist }> = ({
    playlist,
}) => {
    const [isHolding, setIsHolding] = useState<boolean>(false);
    const [fill, setFill] = useState<number>(0);
    const [pending, startTransition] = useTransition();

    const intervalRef = useRef<NodeJS.Timeout>();

    const handleMouseDownOnRemove = () => {
        setIsHolding(true);
    };

    const handleHoldTimeout = () => {
        if (isHolding) {
            const startTime = Date.now();

            intervalRef.current = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                const fill = Math.min((elapsedTime / 2000) * 100, 100);
                setFill(fill);
                if (fill >= 100) {
                    clearInterval(intervalRef.current);
                }
            }, 10);
        } else {
            setFill(0);
            clearInterval(intervalRef.current);
        }
    };

    const handleMouseUpOnRemove = () => {
        setIsHolding(false);
        setFill(0);
        clearInterval(intervalRef.current);
    };

    useEffect(() => {
        if (fill === 100) {
            startTransition(async () => {
                await removePlaylist(playlist);
            });
        }
    }, [fill]);

    useEffect(() => {
        if (isHolding) {
            return handleHoldTimeout();
        }

        return () => handleMouseUpOnRemove();
    }, [isHolding]);

    return (
        <DropdownMenuItem
            disabled={pending}
            onMouseDown={() => handleMouseDownOnRemove()}
            onMouseUp={() => handleMouseUpOnRemove()}
            className="relative flex justify-between text-destructive"
        >
            <div
                className="absolute bottom-0 left-0 top-0 z-10 rounded-sm bg-primary/50 transition-all duration-100 ease-linear"
                style={{ width: `${fill}%` }}
            />
            Remove
            <ClockArrowUpIcon className="h-4 w-4" />
        </DropdownMenuItem>
    );
};

export { PlaylistRemoveButton };
