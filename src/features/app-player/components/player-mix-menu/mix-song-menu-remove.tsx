import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { usePlayerStore } from "@/stores/player";
import { ListMinusIcon } from "lucide-react";

const AppPlayerMixSongMenuRemove: React.FC<{
    index: number;
}> = ({ index }) => {
    const data = usePlayerStore((store) => store.data);
    const removeFromMix = usePlayerStore((store) => store.removeFromMix);

    return (
        <DropdownMenuItem
            onClick={() => removeFromMix(index)}
            disabled={!data || data.length === 1}
        >
            <ListMinusIcon className="mr-2 h-5 w-5" />
            Remove from mix
        </DropdownMenuItem>
    );
};

export { AppPlayerMixSongMenuRemove };
