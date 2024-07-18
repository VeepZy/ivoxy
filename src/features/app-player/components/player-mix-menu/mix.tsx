import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListMusicIcon } from "lucide-react";
import { AppPlayerMixMenuSong } from "./mix-song";
import { usePlayerStore } from "@/stores/player";

const AppPlayerMixMenu: React.FC = () => {
    const data = usePlayerStore((store) => store.data);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                    className="flex-shrink-0"
                >
                    <ListMusicIcon className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-96 min-w-60 p-0">
                <ScrollArea className="max-h-72 overflow-y-auto">
                    <ul className="space-y-2 p-2">
                        {data?.map((song, i) => (
                            <AppPlayerMixMenuSong
                                key={i}
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
