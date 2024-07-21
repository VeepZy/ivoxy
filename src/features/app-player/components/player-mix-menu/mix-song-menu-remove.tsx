import { ListMinusIcon } from "lucide-react";
import { type MouseEvent } from "react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { type SongData } from "@/db/types";
import { usePlayerStore } from "@/stores/player";

const AppPlayerMixSongMenuRemove: React.FC<{
    song: SongData;
}> = ({ song }) => {
    const data = usePlayerStore((store) => store.data);
    const addToRemoved = usePlayerStore((store) => store.addToRemoved);

    const onSubmit = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

        addToRemoved(song);
    };

    return (
        <DropdownMenuItem
            disabled={!data || data.length === 1}
            onClick={onSubmit}
        >
            <ListMinusIcon className="mr-2 h-5 w-5" />
            Remove from mix
        </DropdownMenuItem>
    );
};

export { AppPlayerMixSongMenuRemove };
