import { type NextPage } from "next";
import Image from "next/image";

import { getPlaylists } from "@/db/queries";

import { PlayPlaylist } from "./play";

const PlaylistsRoute: NextPage = async () => {
    const playlists = await getPlaylists();

    return (
        <div className="mx-auto w-full px-4 py-8 md:px-6 md:py-12">
            <header className="mb-8 md:mb-12">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Playlists
                </h1>
                <p className="mt-2 text-lg text-muted-foreground md:text-xl">
                    Manage your playlists
                </p>
            </header>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {playlists.map((playlist) => (
                    <div key={playlist.id} className="group">
                        <div className="relative">
                            <PlayPlaylist playlist={playlist} />
                            <Image
                                alt={playlist.name}
                                className="aspect-square w-full rounded-lg object-cover transition-opacity group-hover:opacity-80"
                                height={180}
                                src={playlist.image_src ?? ""}
                                width={320}
                            />
                        </div>
                        <div className="mt-2 text-center">
                            <h3 className="text-base font-medium">
                                {playlist.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {playlist.data.length} songs
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlaylistsRoute;
