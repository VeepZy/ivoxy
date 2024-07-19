"use client";

import { useMemo } from "react";

import { usePlayerStore } from "@/stores/player";

import { formatDuration } from "../utils/format-duration";

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
