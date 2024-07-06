import { PlayIcon } from "lucide-react";
import { type NextPage } from "next";
import Image from "next/image";

import { PlaylistPlayButton, SongPlayButton } from "@/components/play";
import { Title } from "@/components/title";
import { getPlaylist } from "@/db/queries";

const PlaylistRoute: NextPage<{ params: { id: string } }> = async ({
    params,
}) => {
    const playlist = await getPlaylist(params.id);

    return (
        <div className="mx-auto w-full px-4 py-8 md:px-6 md:py-12">
            <div className="mb-12 flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        {playlist.name}
                    </h2>
                    <p className="text-muted-foreground">
                        Includes {playlist.data.length} songs.
                    </p>
                </div>

                <PlaylistPlayButton playlist={playlist.data} />
            </div>
            <div className="grid gap-4">
                {playlist.data.map((item) => (
                    <div
                        key={item.title}
                        className="grid grid-cols-[48px_1fr_auto] items-center gap-4"
                    >
                        <div className="relative overflow-hidden rounded-md border border-primary/50 shadow-lg dark:border-primary/30">
                            <Image
                                alt={item.title}
                                className="aspect-square h-14 w-14 object-cover transition-all hover:scale-105"
                                height={120}
                                src={item.thumbnail}
                                width={312}
                            />
                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                <PlayIcon className="h-10 w-10 text-white" />
                            </div>
                        </div>
                        <div className="grid gap-1">
                            <Title title={item.title} />
                            <p className="text-xs text-muted-foreground">
                                {item.channelTitle}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <SongPlayButton song={item} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlaylistRoute;
