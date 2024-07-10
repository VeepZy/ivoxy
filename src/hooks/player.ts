"use client";

import { create } from "zustand";

import type { ComponentType, MouseEvent, RefObject } from "react";
import type { SongData } from "@/db/types";
import type ReactPlayer from "react-player";
import { ReactPlayerProps } from "react-player";

type PlayerEvents = {
    play: () => void;
    pause: () => void;
    mute: () => void;
    loop: () => void;
    next: () => void;
    prev: () => void;
    ended: () => void;
    volume: (event: number[]) => void;
    duration: (event: number) => void;
    progress: (event: {
        playedSeconds: number;
        loadedSeconds: number;
    }) => void;
    progressMouse: (
        event: MouseEvent<HTMLDivElement>,
        player: RefObject<ComponentType<ReactPlayerProps> & ReactPlayer>,
    ) => void;
    canNext: (boolean: boolean) => void;
    canPrev: (boolean: boolean) => void;
};

type PlayerState = {
    playing: boolean;
    duration: number;
    loop: boolean;
    data: Array<{
        title: string;
        channelTitle: string;
        url: string;
        thumbnail: string;
    }>;
    index: number;
    volume: number;
    muted: boolean;
    played: number;
    loaded: number;
    canNext: boolean;
    canPrev: boolean;
};

type PlayerControl = {
    setUrl: (
        songs: SongData[],
        keep?: boolean,
        playlist?: boolean,
    ) => void;
    reset: () => void;
};

interface PlayerStore {
    state: PlayerState;
    events: PlayerEvents;
    control: PlayerControl;
}

const initialState: PlayerState = {
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

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    state: initialState,
    control: {
        reset: () => {
            set((store) => ({
                state: {
                    ...store.state,
                    loaded: 0,
                    played: 0,
                    playing: false,
                },
            }));
        },
        setUrl: (
            songs: SongData[],
            keep?: boolean,
            playlist?: boolean,
        ) => {
            get().control.reset();

            set((store) => ({
                state: {
                    ...store.state,
                    data: keep ? [...store.state.data, ...songs] : songs,
                    index: playlist ? 0 : songs.length - 1,
                    playing: true,
                },
            }));
        },
    },
    events: {
        play: () =>
            set((store) => ({ state: { ...store.state, playing: true } })),
        pause: () =>
            set((store) => ({
                state: { ...store.state, playing: false },
            })),
        volume: (event: number[]) =>
            set((store) => ({
                state: { ...store.state, volume: event[0] },
            })),
        duration: (event: number) =>
            set((store) => ({
                state: { ...store.state, duration: event },
            })),
        mute: () =>
            set((store) => ({
                state: { ...store.state, muted: !store.state.muted },
            })),
        loop: () =>
            set((store) => ({
                state: { ...store.state, loop: !store.state.loop },
            })),
        next: () => {
            const state = get().state;

            if (state.canNext) {
                set((store) => ({
                    state: {
                        ...store.state,
                        index: state.index + 1,
                    },
                }));
            }
        },

        prev: () => {
            const state = get().state;

            if (state.canPrev) {
                set((store) => ({
                    state: {
                        ...store.state,
                        index: state.index - 1,
                    },
                }));
            }
        },
        ended: () =>
            set((store) => ({
                state: { ...store.state, playing: false },
            })),
        progress: ({ loadedSeconds, playedSeconds }) =>
            set((store) => ({
                state: {
                    ...store.state,
                    loaded: loadedSeconds,
                    played: playedSeconds,
                },
            })),
        progressMouse: (event, player) => {
            const x = event.clientX;
            const width = event.currentTarget.clientWidth;

            const progress = Math.floor(
                (x / width) * get().state.duration,
            );
            player.current?.seekTo(progress, "seconds");
        },
        canNext: (boolean) =>
            set((store) => ({
                state: { ...store.state, canNext: boolean },
            })),
        canPrev: (boolean) =>
            set((store) => ({
                state: { ...store.state, canPrev: boolean },
            })),
    },
}));
