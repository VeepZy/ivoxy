"use client";

import { ListMusicIcon, PlayIcon } from "lucide-react";
import Image from "next/image";

import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { usePlayerStore } from "@/hooks/player";

const CurrentSongs: React.FC = () => {
    const state = usePlayerStore((store) => store.state);
    const setIndex = usePlayerStore((store) => store.control.setIndex);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={state.data.length === 1}
                    variant="outline"
                >
                    <ListMusicIcon className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
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
                                        className="text-sm"
                                        title={item.title}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {item.channelTitle}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => setIndex(index)}
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
