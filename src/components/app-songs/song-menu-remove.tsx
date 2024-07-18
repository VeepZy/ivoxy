"use client";

import { ClockArrowUpIcon } from "lucide-react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { removeSong } from "@/db/actions";
import { type Song } from "@/db/types";
import { useRemove } from "@/hooks/use-remove";

const DropdownMenuRemove: React.FC<{ song: Song }> = ({ song }) => {
    const [fill, pending, startTimeout, stopTimeout] = useRemove(() =>
        removeSong(song),
    );

    return (
        <DropdownMenuItem
            className="relative flex justify-between text-destructive hover:cursor-pointer hover:bg-secondary"
            disabled={pending}
            onMouseDown={startTimeout}
            onMouseLeave={stopTimeout}
            onMouseUp={stopTimeout}
        >
            <div
                className="absolute bottom-0 left-0 top-0 z-10 rounded-sm bg-primary/50"
                style={{ width: `${fill}%` }}
            />
            Remove
            <ClockArrowUpIcon className="h-4 w-4" />
        </DropdownMenuItem>
    );
};

export { DropdownMenuRemove };
