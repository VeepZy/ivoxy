"use client";

import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";

import { PlaySongButton } from "@/components/play-buttons";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Playlist, Song, SongData } from "@/db/types";
import { BrowseMoreButton } from "./more";

const Items: React.FC<{
    items: SongData[] | null;
    playlists: Playlist[];
    songs: Song[];
    pending: boolean;
    more: () => void;
}> = ({ items, playlists, songs, more, pending }) => {
    return (
        <>
            <div className="flex w-full flex-row flex-wrap gap-8">
                {items?.map((item, index) => (
                    <div
                        key={`${item.title}-${index}`}
                        className="w-[320px] space-y-3"
                    >
                        <div className="group relative overflow-hidden rounded-md border border-primary/50 shadow-lg">
                            <Image
                                alt={item.title}
                                className="aspect-square h-[180px] w-[320px] object-cover transition-all hover:scale-105"
                                height={180}
                                width={320}
                                src={item.thumbnail}
                            />

                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:cursor-pointer group-hover:opacity-100">
                                <PlaySongButton song={item} />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex-1 space-y-1 text-sm">
                                <Title title={item.title} />
                                <p className="text-xs text-muted-foreground">
                                    {item.channelTitle}
                                </p>
                            </div>
                            <BrowseMoreButton
                                playlists={playlists}
                                song={item}
                                songs={songs}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {items && items.length > 0 && (
                <div className="flex justify-center">
                    <Button disabled={pending} onClick={more}>
                        {pending ? (
                            <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                        ) : (
                            <>Load More</>
                        )}
                    </Button>
                </div>
            )}
        </>
    );
};

export { Items };
