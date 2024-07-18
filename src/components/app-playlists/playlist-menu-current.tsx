"use client";

import { ListVideoIcon } from "lucide-react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { PlaylistData } from "@/db/types";
import { usePlayerStore } from "@/stores/player";

const DropdownMenuAddToCurrent: React.FC<{ data: PlaylistData }> = ({
    data,
}) => {
    const addToMix = usePlayerStore((store) => store.addToMix);

    return (
        <DropdownMenuItem
            className="hover:cursor-pointer hover:bg-secondary"
            onClick={() => addToMix(data)}
        >
            <ListVideoIcon className="mr-2 h-5 w-5" />
            Add to current mix
        </DropdownMenuItem>
    );
};

export { DropdownMenuAddToCurrent };
