import { type NextPage } from "next";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SongsContainer } from "@/components/app-songs/container";

const SongsRoute: NextPage = async () => {
    return (
        <ScrollArea className="max-h-full overflow-y-auto p-6">
            <div className="flex w-full flex-row flex-wrap gap-8">
                <SongsContainer />
            </div>
        </ScrollArea>
    );
};

export default SongsRoute;
