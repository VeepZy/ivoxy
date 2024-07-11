import { type NextPage } from "next";
import Image from "next/image";

import {
    PlayPlaylistButton,
    PlaySongButton,
} from "@/components/play-buttons";
import { Title } from "@/components/title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPlaylists, getSongs } from "@/db/queries";
import { type Playlist, type Song } from "@/db/types";

type CombinedItem = Song | Playlist;

const HomeRoute: NextPage = async () => {
    const [songs, playlists] = await Promise.all([
        getSongs(),
        getPlaylists(),
    ]);

    const combined = [...songs, ...playlists];

    const isSong = (item: CombinedItem): item is Song =>
        !Array.isArray(item.data);

    return (
        <ScrollArea className="max-h-full overflow-y-auto p-6">
            <div className="flex w-full flex-row flex-wrap gap-8">
                {combined.map((item) =>
                    isSong(item) ? (
                        <div key={item.id} className="w-[320px] space-y-3">
                            <div className="group relative overflow-hidden rounded-md border border-primary/50 shadow-lg">
                                <Image
                                    alt={item.data.title}
                                    className="aspect-square h-[180px] w-[320px] object-cover transition-all hover:scale-105"
                                    height={180}
                                    src={item.data.thumbnail}
                                    width={320}
                                />

                                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:cursor-pointer group-hover:opacity-100">
                                    <PlaySongButton
                                        song={{
                                            title: item.data.title,
                                            channelTitle:
                                                item.data.channelTitle,
                                            url: `https://www.youtube.com/embed/${item.data.url}`,
                                            thumbnail: item.data.thumbnail,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-1 space-y-1 text-sm">
                                    <Title title={item.data.title} />
                                    <p className="text-xs text-muted-foreground">
                                        {item.data.channelTitle}
                                    </p>
                                </div>
                                {/* <BrowseMoreButton song={item} /> */}
                            </div>
                        </div>
                    ) : (
                        <div key={item.id} className="w-[320px] space-y-3">
                            <div className="group relative overflow-hidden rounded-md border border-primary/50 shadow-lg">
                                <Image
                                    alt={item.name}
                                    className="aspect-square h-[180px] w-[320px] object-cover transition-all hover:scale-105"
                                    height={180}
                                    width={320}
                                    src={
                                        item.image_src ??
                                        "/thumbnail-placeholder.jpg"
                                    }
                                />

                                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:cursor-pointer group-hover:opacity-100">
                                    <PlayPlaylistButton
                                        playlist={item.data}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-1 space-y-1 text-sm">
                                    <Title title={item.name} />
                                    <p className="text-xs text-muted-foreground">
                                        {item.data.length} songs
                                    </p>
                                </div>
                                {/* <BrowseMoreButton song={item} /> */}
                            </div>
                        </div>
                    ),
                )}
            </div>
        </ScrollArea>
    );
};

export default HomeRoute;
