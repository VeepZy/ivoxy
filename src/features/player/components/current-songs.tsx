"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListMusicIcon, PlayIcon } from "lucide-react";
import { useContext } from "react";
import { PlayerContext } from "./context";
import Image from "next/image";
import { Title } from "@/components/title";

const CurrentSongs: React.FC = () => {
    const { state, setState } = useContext(PlayerContext);

    const onSubmit = (index: number) => {
        setState((prevState) => ({
            ...prevState,
            index,
        }));
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <ListMusicIcon className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
                <ScrollArea className="max-h-96">
                    <ul className="space-y-2">
                        {state.data.map((item, index) => (
                            <li
                                key={item.title}
                                className="grid grid-cols-[40px_1fr_auto] items-center gap-4"
                            >
                                <div className="relative overflow-hidden rounded-md border border-primary/50 shadow-lg dark:border-primary/30">
                                    <Image
                                        alt={item.title}
                                        className="aspect-square object-cover transition-all hover:scale-105"
                                        height={120}
                                        src={item.thumbnail}
                                        width={320}
                                    />
                                </div>
                                <div className="grid">
                                    <Title
                                        title={item.title}
                                        className="text-sm"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {item.channelTitle}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onSubmit(index)}
                                    >
                                        <PlayIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};

export { CurrentSongs };
