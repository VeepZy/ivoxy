import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ListPlusIcon } from "lucide-react";

const AppPlayerPlaylistMenu = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                    className="flex-shrink-0"
                >
                    <ListPlusIcon className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                        Add to Playlist
                    </h3>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export { AppPlayerPlaylistMenu };
