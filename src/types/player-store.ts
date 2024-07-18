import { PlaylistData, SongData } from "@/db/types";

interface OnProgressProps {
    playedSeconds: number;
    loadedSeconds: number;
}

interface PlayerStoreState {
    isPlaying: boolean;
    isLooped: boolean;
    isShuffled: boolean;
    isMuted: boolean;
    duration: number;
    played: number;
    loaded: number;
    volume: number;
    currentIndex: number;
    data: SongData[] | null;
    canNext: boolean;
    canPrevious: boolean;
}

interface PlayerStoreActions {
    reset: () => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    toggleMute: () => void;
    setVolume: (volume: number[]) => void;
    setDuration: (duration: number) => void;
    setCurrentIndex: (currentIndex: number) => void;
    setNext: () => void;
    setPrev: () => void;
    setCanNext: (canNext: boolean) => void;
    setCanPrevious: (canPrevious: boolean) => void;
    setData: (data: SongData[] | PlaylistData) => void;
    onPlay: () => void;
    onPause: () => void;
    onProgress: (progress: OnProgressProps) => void;
    onEnded: () => void;
    addToMix: (newData: SongData | PlaylistData) => void;
    removeFromMix: (index: number) => void;
}

export type { PlayerStoreState, PlayerStoreActions };
