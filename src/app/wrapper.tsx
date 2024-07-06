import { getPlaylists } from "@/db/queries";
import { VideoPlayer } from "@/features/player/components/player";
import { Sidebar } from "@/features/sidebar/components/sidebar";
import { Suspense, type ReactNode } from "react";

const Wrapper: React.FC<{ children: ReactNode }> = async ({
    children,
}) => {
    const playlists = await getPlaylists();

    return (
        <div className="grid lg:grid-cols-5">
            <Sidebar playlists={playlists} />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
                {children}
            </div>
            <Suspense fallback={null}>
                <VideoPlayer playlists={playlists} />
            </Suspense>
        </div>
    );
};

export { Wrapper };
