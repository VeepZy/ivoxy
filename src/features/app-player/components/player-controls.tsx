"use client";

import {
    PauseIcon,
    PlayIcon,
    Repeat2Icon,
    ShuffleIcon,
    SkipBackIcon,
    SkipForwardIcon,
    Volume2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/player";

const AppPlayerControls: React.FC = () => {
    const isPlaying = usePlayerStore((store) => store.isPlaying);
    const isMuted = usePlayerStore((store) => store.isMuted);
    const isShuffled = usePlayerStore((store) => store.isShuffled);
    const isLooped = usePlayerStore((store) => store.isLooped);

    const canPrevious = usePlayerStore((store) => store.canPrevious);
    const canNext = usePlayerStore((store) => store.canNext);

    const togglePlay = usePlayerStore((store) => store.togglePlay);
    const toggleLoop = usePlayerStore((store) => store.toggleLoop);
    const toggleShuffle = usePlayerStore((store) => store.toggleShuffle);
    const toggleMute = usePlayerStore((store) => store.toggleMute);

    const setPrev = usePlayerStore((store) => store.setPrev);
    const setNext = usePlayerStore((store) => store.setNext);
    const setVolume = usePlayerStore((store) => store.setVolume);

    const volume = usePlayerStore((store) => store.volume);

    return (
        <div className="flex gap-2">
            <Button
                className="flex-shrink-0"
                disabled={!canPrevious}
                size="icon"
                variant="ghost"
                onClick={setPrev}
            >
                <SkipBackIcon className="h-5 w-5" />
            </Button>
            <Button
                className="flex-shrink-0"
                size="icon"
                variant="ghost"
                onClick={togglePlay}
            >
                {isPlaying ? (
                    <PauseIcon className="h-6 w-6" />
                ) : (
                    <PlayIcon className="h-6 w-6" />
                )}
            </Button>
            <Button
                className="flex-shrink-0"
                disabled={!canNext}
                size="icon"
                variant="ghost"
                onClick={setNext}
            >
                <SkipForwardIcon className="h-5 w-5" />
            </Button>
            <Button
                className="flex-shrink-0"
                size="icon"
                variant={isLooped ? "secondary" : "ghost"}
                onClick={toggleLoop}
            >
                <Repeat2Icon className="h-6 w-6" />
            </Button>
            <Button
                className="flex-shrink-0"
                size="icon"
                variant={isShuffled ? "secondary" : "ghost"}
                onClick={toggleShuffle}
            >
                <ShuffleIcon className="h-6 w-6" />
            </Button>
            <Slider
                className="min-w-[120px]"
                defaultValue={[volume]}
                max={1}
                min={0}
                step={0.05}
                onValueChange={setVolume}
            />
            <Button
                className="flex-shrink-0"
                size="icon"
                variant={isMuted ? "secondary" : "ghost"}
                onClick={toggleMute}
            >
                <Volume2Icon className="h-6 w-6" />
            </Button>
        </div>
    );
};

export { AppPlayerControls };
