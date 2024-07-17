"use client";

import { Progress } from "@/components/ui/progress";
import { PlayerRef } from "../types/player-ref";

const AppPlayerProgress: React.FC<{ player: PlayerRef }> = ({
    player,
}) => {
    return (
        <Progress
            className="h-2 rounded-none border-none"
            max={100}
            segments={[{ value: 50 }, { value: 75, load: true }]}
            onClick={(event) => void 0}
        />
    );
};

export { AppPlayerProgress };
