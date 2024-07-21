import { create } from "zustand";

import type {
    PlayerStoreActions,
    PlayerStoreState,
} from "@/types/player-store";
import { generateRandomNumber } from "@/utils/random-number";

const initialState: PlayerStoreState = {
    isPlaying: false,
    isLooped: false,
    isShuffled: false,
    isMuted: false,
    duration: 0,
    played: 0,
    loaded: 0,
    volume: 0.5,
    currentIndex: 0,
    data: null,
    removedElements: null,
    canNext: false,
    canPrevious: false,
};

const usePlayerStore = create<PlayerStoreState & PlayerStoreActions>(
    (set, get) => ({
        ...initialState,
        reset: () =>
            set(({ isLooped, isShuffled, isMuted, volume }) => ({
                ...initialState,
                volume,
                isLooped,
                isShuffled,
                isMuted,
            })),
        togglePlay: () =>
            set(({ isPlaying }) => ({
                isPlaying: !isPlaying,
            })),
        toggleLoop: () =>
            set(({ isLooped }) => ({
                isLooped: !isLooped,
            })),
        toggleShuffle: () =>
            set(({ isShuffled }) => ({
                isShuffled: !isShuffled,
            })),
        toggleMute: () =>
            set(({ isMuted }) => ({
                isMuted: !isMuted,
            })),
        setVolume: (volume) =>
            set(() => ({
                volume: volume[0],
            })),
        setDuration: (duration) =>
            set(() => ({
                duration,
            })),
        setCurrentIndex: (currentIndex) =>
            set(() => ({
                currentIndex,
            })),
        setNext: () => {
            const { canNext, currentIndex } = get();

            if (canNext) {
                set({ currentIndex: currentIndex + 1 });
            }
        },
        setPrev: () => {
            const { canPrevious, currentIndex } = get();

            if (canPrevious) {
                set({ currentIndex: currentIndex - 1 });
            }
        },
        setCanNext: (canNext) =>
            set(() => ({
                canNext,
            })),
        setCanPrevious: (canPrevious) =>
            set(() => ({
                canPrevious,
            })),
        setData: (data) =>
            set(() => ({
                data,
                currentIndex: 0,
                isPlaying: true,
            })),
        onPlay: () =>
            set(() => ({
                isPlaying: true,
            })),
        onPause: () =>
            set(() => ({
                isPlaying: false,
            })),
        onProgress: ({ playedSeconds, loadedSeconds }) =>
            set(() => ({
                played: playedSeconds,
                loaded: loadedSeconds,
            })),
        onEnded: () => {
            const {
                isLooped,
                isShuffled,
                data,
                currentIndex,
                removedElements,
                removeFromMix,
            } = get();

            if (removedElements) {
                removeFromMix(removedElements);
            }

            if (isLooped) {
                // Handled by react-player
            } else if (isShuffled && data && data.length > 1) {
                const random = generateRandomNumber(
                    currentIndex,
                    data.length,
                );
                set({ currentIndex: random });
            } else if (data && currentIndex + 1 < data.length) {
                set({ currentIndex: currentIndex + 1 });
            } else {
                set({ isPlaying: false });
            }
        },
        addToMix: (newData) => {
            const { data } = get();
            const isArray = Array.isArray(newData);

            if (!data) {
                set({ data: isArray ? newData : [newData] });
                return;
            }

            if (isArray) {
                set({ data: [...data, ...newData] });
                return;
            }

            set({ data: [...data, newData] });
        },
        addToRemoved: (removed) => {
            const { removedElements } = get();

            if (!removedElements) {
                set({ removedElements: [removed] });
                return;
            }

            set({ removedElements: [...removedElements, removed] });
        },
        removeFromMix: (elements) => {
            const { data } = get();

            if (!data) {
                return;
            }

            const newArray = data.filter(
                (song) => !elements.includes(song),
            );

            set({ data: newArray, removedElements: null });
        },
    }),
);

export { usePlayerStore };
