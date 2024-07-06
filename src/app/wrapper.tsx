import { type ReactNode, Suspense } from "react";

import { getPlaylists, getSongs } from "@/db/queries";
import { VideoPlayer } from "@/features/player/components/player";
import { Sidebar } from "@/features/sidebar/components/sidebar";

const Wrapper: React.FC<{ children: ReactNode }> = async ({
    children,
}) => {
    const [playlists, songs] = await Promise.all([
        getPlaylists(),
        getSongs(),
    ]);

    return (
        <div className="grid lg:grid-cols-5">
            <Sidebar playlists={playlists} />
            <div className="col-span-3 pb-20 lg:col-span-4 lg:border-l">
                {children}
            </div>
            <Suspense fallback={null}>
                <VideoPlayer playlists={playlists} songs={songs} />
            </Suspense>
        </div>
    );
};

export { Wrapper };
