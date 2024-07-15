"use client";

import { type ComponentType, type RefObject } from "react";
import { type ReactPlayerProps } from "react-player";
import type ReactPlayer from "react-player";
import { type OnProgressProps } from "react-player/base";
import { create } from "zustand";

import { type PlaylistData, type SongData } from "@/db/types";
import { generateRandomNumber } from "@/lib/utils";

const initialState = {
    playing: false,
    duration: 0,
    loop: false,
    shuffle: false,
    data: null,
    index: 0,
    volume: 0.5,
    muted: false,
    played: 0,
    loaded: 0,
    canNext: false,
    canPrev: false,
};

interface PlayerStore {
    playing: boolean;
    duration: number;
    loop: boolean;
    shuffle: boolean;
    data: SongData[] | null;
    index: number;
    volume: number;
    muted: boolean;
    played: number;
    loaded: number;
    canNext: boolean;
    canPrev: boolean;
}

export const usePlayerStore = create<PlayerStore>(() => ({
    ...initialState,
}));

export const reset = () => {
    const { volume, loop, shuffle, muted } = usePlayerStore.getState();
    usePlayerStore.setState(() => ({
        ...initialState,
        volume,
        loop,
        shuffle,
        muted,
    }));
};

export const togglePlay = () =>
    usePlayerStore.setState((state) => ({ playing: !state.playing }));
export const toggleLoop = () =>
    usePlayerStore.setState((state) => ({ loop: !state.loop }));
export const toggleShuffle = () =>
    usePlayerStore.setState((state) => ({ shuffle: !state.shuffle }));
export const toggleMute = () =>
    usePlayerStore.setState((state) => ({ muted: !state.muted }));

export const setVolume = (volume: number[]) =>
    usePlayerStore.setState(() => ({ volume: volume[0] }));
export const setDuration = (duration: number) =>
    usePlayerStore.setState(() => ({ duration }));
export const setPrev = () => {
    const { canPrev, index } = usePlayerStore.getState();

    if (canPrev) {
        usePlayerStore.setState(() => ({ index: index - 1 }));
    }
};
export const setNext = () => {
    const { canNext, index } = usePlayerStore.getState();

    if (canNext) {
        usePlayerStore.setState(() => ({ index: index + 1 }));
    }
};
export const setCanNext = (canNext: boolean) =>
    usePlayerStore.setState(() => ({ canNext }));
export const setCanPrev = (canPrev: boolean) =>
    usePlayerStore.setState(() => ({ canPrev }));
export const setIndex = (index: number) =>
    usePlayerStore.setState(() => ({ index }));
export const setSeek = (
    event: React.MouseEvent<HTMLDivElement>,
    player: RefObject<ComponentType<ReactPlayerProps> & ReactPlayer>,
) => {
    const { duration } = usePlayerStore.getState();
    const x = event.clientX;
    const width = event.currentTarget.clientWidth;

    const progress = Math.floor((x / width) * duration);
    player.current?.seekTo(progress, "seconds");
};
export const setPlaylist = (playlist: PlaylistData) => {
    reset();
    usePlayerStore.setState(() => ({ data: playlist }));
};
export const setSong = (song: SongData) => {
    reset();
    usePlayerStore.setState(() => ({ data: [song], playing: true }));
};

export const onDuration = (duration: number) => {
    console.log("onDuration", duration);
    usePlayerStore.setState(() => ({ duration }));
};

export const onPlay = () =>
    usePlayerStore.setState(() => ({ playing: true }));
export const onPause = () =>
    usePlayerStore.setState(() => ({ playing: false }));
export const onProgress = (progress: OnProgressProps) =>
    usePlayerStore.setState(() => ({
        played: progress.playedSeconds,
        loaded: progress.loadedSeconds,
    }));
export const onEnded = () => {
    const { loop, shuffle, data, index } = usePlayerStore.getState();

    if (loop) {
        usePlayerStore.setState(() => ({ playing: true }));
    } else if (shuffle && data && data.length > 1) {
        const random = generateRandomNumber(index, data.length);
        usePlayerStore.setState(() => ({ index: random }));
    } else if (data && index + 1 < data.length) {
        usePlayerStore.setState(() => ({ index: index + 1 }));
    } else {
        usePlayerStore.setState(() => ({ playing: false }));
    }
};
export const onBufferEnd = (
    player: RefObject<ComponentType<ReactPlayerProps> & ReactPlayer>,
) => {
    const duration = Math.round(player.current?.getDuration() ?? 0);
    console.log("onBufferEnd", duration);
    usePlayerStore.setState(() => ({ duration }));
};

export const updateNextAndPrev = (canNext: boolean, canPrev: boolean) =>
    usePlayerStore.setState(() => ({ canNext, canPrev }));

export const addSongToCurrent = (song: SongData) =>
    usePlayerStore.setState((state) => ({
        data: state.data ? [...state.data, song] : [song],
    }));
export const addPlaylistToCurrent = (playlist: PlaylistData) =>
    usePlayerStore.setState((state) => ({
        data: state.data ? [...state.data, ...playlist] : playlist,
    }));
