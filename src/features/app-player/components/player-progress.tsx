"use client";

import { Progress } from "@/components/ui/progress";
import { PlayerRef } from "../types/player-ref";
import { usePlayerStore } from "@/stores/player";
import { MouseEvent, useMemo } from "react";

const AppPlayerProgress: React.FC<{ player: PlayerRef }> = ({
    player,
}) => {
    const played = usePlayerStore((store) => store.played);
    const loaded = usePlayerStore((store) => store.loaded);
    const duration = usePlayerStore((store) => store.duration);

    const seekTo = useMemo(
        () => (event: MouseEvent<HTMLDivElement>) => {
            const x = event.clientX;
            const width = event.currentTarget.clientWidth;
            const progress = Math.floor((x / width) * duration);

            player.current?.seekTo(progress, "seconds");
        },
        [player, duration],
    );

    return (
        <Progress
            className="h-2 rounded-none border-none"
            max={duration}
            onClick={seekTo}
            segments={[{ value: played }, { value: loaded, load: true }]}
        />
    );
};

export { AppPlayerProgress };
