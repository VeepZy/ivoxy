import { getPlaylist } from "@/db/queries";
import { NextPage } from "next";
import Image from "next/image";

const PlaylistRoute: NextPage<{ params: { id: string } }> = async ({
    params,
}) => {
    const playlist = await getPlaylist(params.id);

    return (
        <div className="mx-auto w-full px-4 py-8 md:px-6 md:py-12">
            <header className="mb-8 md:mb-12">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    {playlist.name}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground md:text-xl">
                    {playlist.data.length} songs
                </p>
            </header>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {playlist.data.map((song) => (
                    <div key={song.title} className="group">
                        <div className="relative">
                            {/* <PlaySong song={song} /> */}
                            <Image
                                alt={song.title}
                                className="aspect-square w-full rounded-lg object-cover transition-opacity group-hover:opacity-80"
                                height={180}
                                src={song.thumbnail}
                                width={320}
                            />
                        </div>
                        <div className="mt-2 text-center">
                            <h3 className="text-base font-medium">
                                {song.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {song.channelTitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlaylistRoute;
