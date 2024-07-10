"use client";

import { type youtube_v3 as Youtube } from "googleapis";
import Image from "next/image";

import { BrowseMoreButton } from "@/app/browse/more";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { PlaySongButton } from "@/components/play-buttons";

const Items: React.FC<{
    items: Youtube.Schema$SearchResult[];
    pending: boolean;
    more: () => void;
}> = ({ items, more, pending }) => {
    return (
        <>
            <div className="flex w-full flex-row flex-wrap gap-8">
                {items.map((item) => (
                    <div key={item.etag} className="w-[320px] space-y-3">
                        <div className="group relative overflow-hidden rounded-md border border-primary/50 shadow-lg">
                            <Image
                                alt={item.snippet?.title ?? ""}
                                className="aspect-square h-[180px] w-[320px] object-cover transition-all hover:scale-105"
                                height={180}
                                width={320}
                                src={
                                    item.snippet?.thumbnails?.medium
                                        ?.url ?? ""
                                }
                            />

                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:cursor-pointer group-hover:opacity-100">
                                <PlaySongButton
                                    song={{
                                        title: item.snippet?.title ?? "",
                                        channelTitle:
                                            item.snippet?.channelTitle ??
                                            "",
                                        url: `https://www.youtube.com/embed/${item.id?.videoId ?? ""}`,
                                        thumbnail:
                                            item.snippet?.thumbnails
                                                ?.medium?.url ?? "",
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex-1 space-y-1 text-sm">
                                <Title title={item.snippet?.title ?? ""} />
                                <p className="text-xs text-muted-foreground">
                                    {item.snippet?.channelTitle ?? ""}
                                </p>
                            </div>
                            <BrowseMoreButton song={item} />
                        </div>
                    </div>
                ))}
            </div>
            {items.length > 0 && (
                <div className="flex justify-center">
                    <Button onClick={more} disabled={pending}>
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
