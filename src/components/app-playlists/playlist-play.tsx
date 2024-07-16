import { PlayIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type PlaylistData } from "@/db/types";

const PlayPlaylistButton: React.FC<{ playlist: PlaylistData }> = ({
    playlist,
}) => {
    return (
        <Button
            className="group-hover:bg-primary"
            size="icon"
            variant="ghost"
        >
            <span className="sr-only">Play</span>
            <PlayIcon className="h-5 w-5" />
        </Button>
    );
};

export { PlayPlaylistButton };
