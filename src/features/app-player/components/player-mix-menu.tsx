import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UnescapedTitle } from "@/features/unescaped-title/components";
import { ListMusicIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import { AppPlayerMixMenuSong } from "./player-mix-menu-song";

const AppPlayerMixMenu = () => {
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
                        {Array.from({ length: 10 }).map((_, i) => (
                            <AppPlayerMixMenuSong key={i} />
                        ))}
                    </ul>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};

export { AppPlayerMixMenu };
