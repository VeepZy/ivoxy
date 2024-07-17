"use client";

import { ListVideoIcon } from "lucide-react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { type SongData } from "@/db/types";

const DropdownMenuAddToCurrent: React.FC<{ song: SongData }> = ({
    song,
}) => {
    return (
        <DropdownMenuItem
            className="hover:cursor-pointer hover:bg-secondary"
            onClick={() => void 0}
        >
            <ListVideoIcon className="mr-2 h-5 w-5" />
            Add to current mix
        </DropdownMenuItem>
    );
};

export { DropdownMenuAddToCurrent };
