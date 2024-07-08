import { type NextPage } from "next";
import Image from "next/image";

import { SongPlayButton } from "@/components/play";
import { Title } from "@/components/title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSongs } from "@/db/queries";

import { SongMoreButton } from "./more";


const SongsRoute: NextPage = async () => {
    const songs = await getSongs();

    return (
        <ScrollArea className="max-h-[calc(100vh-100px)] overflow-y-auto p-6">
            <div className="flex w-full flex-row flex-wrap gap-8">
                {songs.map((item) => (
                    <div
                        key={item.data.title}
                        className="w-[320px] space-y-3"
                    >
                        <div className="group relative overflow-hidden rounded-md border border-primary/50 shadow-lg">
                            <Image
                                alt={item.data.title}
                                className="aspect-square h-[180px] w-[320px] object-cover transition-all hover:scale-105"
                                height={180}
                                src={item.data.thumbnail}
                                width={320}
                            />

                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:cursor-pointer group-hover:opacity-100">
                                <SongPlayButton song={item.data} />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex-1 space-y-1 text-sm">
                                <Title title={item.data.title} />
                                <p className="text-xs text-muted-foreground">
                                    {item.data.channelTitle}
                                </p>
                            </div>
                            <SongMoreButton song={item} />
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
};

export default SongsRoute;
