import { type NextPage } from "next";

import { ScrollArea } from "@/components/ui/scroll-area";

import { SongsContainer } from "@/components/app-songs/container";
import { PlaylistContainer } from "@/components/app-playlists/container";

const HomeRoute: NextPage = () => {
    return (
        <ScrollArea className="max-h-full overflow-y-auto p-6">
            <div className="flex w-full flex-row flex-wrap gap-8">
                <SongsContainer />
                <PlaylistContainer />
            </div>
        </ScrollArea>
    );
};

export default HomeRoute;
