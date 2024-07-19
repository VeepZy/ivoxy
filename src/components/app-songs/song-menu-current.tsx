"use client";

import { ListVideoIcon } from "lucide-react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { type SongData } from "@/db/types";
import { usePlayerStore } from "@/stores/player";

const DropdownMenuAddToCurrent: React.FC<{ song: SongData }> = ({
    song,
}) => {
    const data = usePlayerStore((store) => store.data);
    const addToMix = usePlayerStore((store) => store.addToMix);

    const existsInMix = data
        ? data.some((item) => item.url === song.url)
        : false;

    return (
        <DropdownMenuItem
            className="hover:cursor-pointer hover:bg-secondary"
            disabled={existsInMix}
            onClick={() => addToMix(song)}
        >
            <ListVideoIcon className="mr-2 h-5 w-5" />
            Add to current mix
        </DropdownMenuItem>
    );
};

export { DropdownMenuAddToCurrent };
