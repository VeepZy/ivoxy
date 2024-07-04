"use client";

import { PlayerContext } from "@/features/player/components/context";
import { usePlayerState } from "@/hooks/state";
import { unescapeHTML } from "@/lib/utils";
import { youtube_v3 } from "googleapis";
import Image from "next/image";
import { useContext } from "react";

const Items: React.FC<{ items: youtube_v3.Schema$SearchResult[] }> = ({
    items,
}) => {
    const { setUrl } = useContext(PlayerContext);

    return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <div key={item.etag} className="w-[320px] space-y-3">
                    <button
                        className="overflow-hidden rounded-md ring-2 ring-destructive"
                        onClick={() =>
                            setUrl(
                                `https://www.youtube.com/embed/${item.id?.videoId ?? null}`,
                            )
                        }
                    >
                        <Image
                            src={
                                item.snippet?.thumbnails?.medium?.url ?? ""
                            }
                            width={320}
                            height={180}
                            alt={item.snippet?.title ?? ""}
                            className="aspect-square h-[180px] w-[320px] object-cover transition-all hover:scale-105"
                        />
                    </button>
                    <div className="space-y-1 text-sm">
                        <h3 className="font-semibold leading-none">
                            {unescapeHTML(item.snippet?.title ?? "")}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            {item.snippet?.channelTitle ?? ""}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Items;
