"use client";

import { useState } from "react";

export const usePlayerState = () => {
    const [state, setState] = useState(() => ({
        playing: false,
        duration: 0,
        loop: false,
        url: "https://www.youtube.com/embed/cbuRqNCy5k8",
        volume: 0.5,
        muted: false,
        played: 0,
        loaded: 0,
    }));

    return [state, setState] as const;
};
