"use client";

import { useEffect, useState } from "react";

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

    const setUrl = (newUrl: string) => {
        console.log("SET URL", state.url, newUrl);
        setState((prevState) => ({
            ...prevState,
            url: newUrl,
            played: 0,
            loaded: 0,
            playing: false,
        }));
    };

    const onPlay = () => {
        console.log("ON PLAY");
        setState((prevState) => ({ ...prevState, playing: true }));
    };

    const onPause = () => {
        console.log("ON PAUSE");
        setState((prevState) => ({ ...prevState, playing: false }));
    };

    const onEnded = () => {
        console.log("ON ENDED");
        setState((prevState) => ({ ...prevState, playing: false }));
    };

    const onProgress = (event: {
        playedSeconds: number;
        loadedSeconds: number;
    }) => {
        console.log("ON PROGRESS", event);
        setState((prevState) => ({
            ...prevState,
            played: event.playedSeconds,
        }));
    };

    const onDuration = (duration: number) => {
        console.log("ON DURATION", duration);
        setState((prevState) => ({
            ...prevState,
            duration: duration,
        }));
    };

    return {
        state,
        onPlay,
        onPause,
        onEnded,
        onProgress,
        onDuration,
        setUrl,
    };
};
