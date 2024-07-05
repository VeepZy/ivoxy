"use client";

import { useState } from "react";

export const usePlayerState = () => {
    const [state, setState] = useState(() => ({
        playing: false,
        duration: 0,
        loop: false,
        data: [
            {
                title: "Eminem - Tobey",
                channelTitle: "Eminem",
                url: "https://www.youtube.com/embed/cbuRqNCy5k8",
            },
        ],
        index: 0,
        volume: 0.5,
        muted: false,
        played: 0,
        loaded: 0,
        canNext: false,
        canPrev: false,
    }));

    return [state, setState] as const;
};
