"use client";

import { usePlayerStore } from "@/stores/player";
import { formatDuration } from "../utils/format-duration";
import { useMemo } from "react";

const AppPlayerDuration: React.FC = () => {
    const played = usePlayerStore((store) => store.played);
    const duration = usePlayerStore((store) => store.duration);

    const formattedDuration = useMemo(
        () => formatDuration(duration),
        [duration],
    );

    return <p>{`${formatDuration(played)}:${formattedDuration}`}</p>;
};

export { AppPlayerDuration };
