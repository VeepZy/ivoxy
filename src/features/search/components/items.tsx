"use client";

import { type youtube_v3 as Youtube } from "googleapis";
import Image from "next/image";
import { SongPlayButton } from "@/components/play";
import { Title } from "@/components/title";
import { BrowseMoreButton } from "@/app/browse/more";

const Items: React.FC<{ items: Youtube.Schema$SearchResult[] }> = ({
    items,
}) => {
    return (
        <div className="flex w-full flex-row flex-wrap gap-8">
            {items.map((item) => (
                <div key={item.etag} className="w-[320px] space-y-3">
                    <div className="group relative overflow-hidden rounded-md border border-primary/50 shadow-lg">
                        <Image
                            alt={item.snippet?.title ?? ""}
                            className="aspect-square h-[180px] w-[320px] object-cover transition-all hover:scale-105"
                            height={180}
                            src={
                                item.snippet?.thumbnails?.medium?.url ?? ""
                            }
                            width={320}
                        />

                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:cursor-pointer group-hover:opacity-100">
                            <SongPlayButton
                                song={{
                                    title: item.snippet?.title ?? "",
                                    channelTitle:
                                        item.snippet?.channelTitle ?? "",
                                    url: `https://www.youtube.com/embed/${item.id?.videoId ?? ""}`,
                                    thumbnail:
                                        item.snippet?.thumbnails?.medium
                                            ?.url ?? "",
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
    );
};

export { Items };
