import { getPlaylist, getSongs } from "@/db/queries";
import { unescapeHTML } from "@/lib/utils.client";
import { PlayIcon } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";
import PlaylistTitle from "../playlists/[id]/title";

const SongsRoute: NextPage = async () => {
    const songs = await getSongs();

    return (
        <div className="mx-auto w-full px-4 py-8 md:px-6 md:py-12">
            <header className="mb-8 md:mb-12">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Songs
                </h1>
                <p className="mt-2 text-lg text-muted-foreground md:text-xl">
                    {songs.length} songs
                </p>
            </header>
            <div className="flex w-full flex-row flex-wrap gap-8">
                {songs.map((item) => (
                    <div
                        key={item.data.title}
                        className="w-[320px] space-y-3"
                    >
                        <div className="relative overflow-hidden rounded-md border border-primary/50 shadow-lg">
                            <Image
                                alt={item.data.title}
                                className="aspect-square h-[180px] w-[320px] object-cover transition-all hover:scale-105"
                                height={180}
                                width={320}
                                src={item.data.thumbnail}
                            />
                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                <PlayIcon className="h-10 w-10 text-white" />
                            </div>
                        </div>
                        <div className="space-y-1 text-sm">
                            <PlaylistTitle title={item.data.title} />
                            <p className="text-xs text-muted-foreground">
                                {item.data.channelTitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SongsRoute;
