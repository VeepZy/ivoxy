"use client";

import { type youtube_v3 as Youtube } from "googleapis";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { PlayerContext } from "@/features/player/components/context";
import { useMounted } from "@/hooks/mounted";
import { unescapeHTML } from "@/lib/utils.client";

const Items: React.FC<{ items: Youtube.Schema$SearchResult[] }> = ({
    items,
}) => {
    const { setUrl } = useContext(PlayerContext);

    const isMounted = useMounted();

    if (!isMounted) {
        return null;
    }

    const onSubmit = (item: Youtube.Schema$SearchResult) => {
        if (!item.id?.videoId) return;

        setUrl([
            {
                title: item.snippet?.title ?? "",
                channelTitle: item.snippet?.channelTitle ?? "",
                url: `https://www.youtube.com/embed/${item.id.videoId}`,
            },
        ]);
    };

    return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <div key={item.etag} className="w-[320px] space-y-3">
                    <button
                        className="relative overflow-hidden rounded-md ring-2 ring-destructive"
                        type="button"
                        onClick={() => onSubmit(item)}
                    >
                        <Image
                            alt={item.snippet?.title ?? ""}
                            className="aspect-square h-[180px] w-[320px] object-cover transition-all hover:scale-105"
                            height={180}
                            width={320}
                            src={
                                item.snippet?.thumbnails?.medium?.url ?? ""
                            }
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                            <PlayIcon className="h-10 w-10 text-white" />
                        </div>
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

export { Items };
