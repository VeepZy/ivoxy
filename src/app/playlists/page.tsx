import { type NextPage } from "next";

import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaylistContainer } from "@/components/app-playlists/container";

const PlaylistsRoute: NextPage = () => {
    return (
        <ScrollArea className="max-h-full overflow-y-auto p-6">
            <div className="flex w-full flex-row flex-wrap gap-8">
                <PlaylistContainer />
            </div>
        </ScrollArea>
    );
};

export default PlaylistsRoute;
