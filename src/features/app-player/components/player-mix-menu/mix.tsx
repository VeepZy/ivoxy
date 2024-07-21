import { ListMusicIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayerStore } from "@/stores/player";

import { AppPlayerMixMenuSong } from "./mix-song";

const AppPlayerMixMenu: React.FC = () => {
    const data = usePlayerStore((store) => store.data);
    const removedElements = usePlayerStore(
        (store) => store.removedElements,
    );

    const filtered = data?.filter(
        (song) => !removedElements?.includes(song),
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className="flex-shrink-0"
                    size="icon"
                    variant="outline"
                >
                    <ListMusicIcon className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-96 min-w-60 p-0">
                <ScrollArea className="max-h-72 overflow-y-auto">
                    <ul className="space-y-2 p-2">
                        {filtered?.map((song, i) => (
                            <AppPlayerMixMenuSong
                                key={`${song.url}+${song.title}`}
                                index={i}
                                song={song}
                            />
                        ))}
                    </ul>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};

export { AppPlayerMixMenu };
