"use client";

import { type MouseEvent, useMemo } from "react";

import { Progress } from "@/components/ui/progress";
import { usePlayerStore } from "@/stores/player";

import { type PlayerRef } from "../types/player-ref";

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
            segments={[{ value: played }, { value: loaded, load: true }]}
            onClick={seekTo}
        />
    );
};

export { AppPlayerProgress };
