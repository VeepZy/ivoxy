"use client";

import { usePlayerState } from "@/hooks/state";
import { createContext, Dispatch, ReactNode, SetStateAction } from "react";

export const initialState = {
    playing: false,
    duration: 0,
    loop: false,
    url: "https://www.youtube.com/embed/cbuRqNCy5k8",
    volume: 0.5,
    muted: false,
    played: 0,
    loaded: 0,
    title: "",
    channelTitle: "",
};

export type PlayerContextType = {
    state: {
        playing: boolean;
        duration: number;
        loop: boolean;
        url: string;
        volume: number;
        muted: boolean;
        played: number;
        loaded: number;
        title: string;
        channelTitle: string;
    };
    setUrl: (newUrl: string) => void;
    setState: Dispatch<SetStateAction<PlayerContextType["state"]>>;
    setTitle: (title: string, channelTitle: string) => void;
};

export const PlayerContext = createContext<PlayerContextType>({
    state: initialState,
    setState: () => {},
    setUrl: () => {},
    setTitle: () => {},
});

const PlayerProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, setState] = usePlayerState();

    const setUrl = (newUrl: string) => {
        console.log("SET URL", state.url, newUrl);
        setState((prevState) => ({
            ...prevState,
            url: newUrl,
            played: 0,
            loaded: 0,
            playing: true,
        }));
    };

    const setTitle = (title: string, channelTitle: string) => {
        setState((prevState) => ({
            ...prevState,
            title,
            channelTitle,
        }));
    };

    return (
        <PlayerContext.Provider
            value={{
                state,
                setState,
                setUrl,
                setTitle,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerProvider;
