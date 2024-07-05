"use client";

import {
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    createContext,
} from "react";

import { usePlayerState } from "@/hooks/state";

export const initialState = {
    playing: false,
    duration: 0,
    loop: false,
    data: [
        {
            title: "Eminem - Tobey",
            channelTitle: "Eminem",
            url: "https://www.youtube.com/embed/cbuRqNCy5k8",
            thumbnail: "https://i.ytimg.com/vi/cbuRqNCy5k8/hqdefault.jpg",
        },
    ],
    index: 0,
    volume: 0.5,
    muted: false,
    played: 0,
    loaded: 0,
    canNext: false,
    canPrev: false,
};

export interface PlayerContextType {
    state: {
        playing: boolean;
        duration: number;
        loop: boolean;
        data: {
            title: string;
            channelTitle: string;
            url: string;
            thumbnail: string;
        }[];
        index: number;
        volume: number;
        muted: boolean;
        played: number;
        loaded: number;
        canNext: boolean;
        canPrev: boolean;
    };
    setUrl: (
        song: {
            title: string;
            channelTitle: string;
            url: string;
            thumbnail: string;
        }[],
    ) => void;
    setState: Dispatch<SetStateAction<PlayerContextType["state"]>>;
    setTitle: (title: string, channelTitle: string) => void;
}

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

    const setUrl = (
        songs: {
            title: string;
            channelTitle: string;
            url: string;
            thumbnail: string;
        }[],
    ) => {
        setState((prevState) => ({
            ...prevState,
            data: songs,
            index: prevState.data.length - 1,
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

export { PlayerProvider };
