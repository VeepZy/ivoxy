"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { usePlayerState } from "@/hooks/state";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Suspense, useRef } from "react";
import ReactPlayer from "react-player";

const VideoPlayer: React.FC = () => {
    const player = useRef<ReactPlayer>(null);
    const { state, onPlay, onPause, onEnded, onProgress, onDuration } =
        usePlayerState();

    return (
        <div className="fixed bottom-0 left-0 right-0 flex h-16 w-full items-center border-t bg-card shadow-lg">
            <div className="flex flex-1 items-center justify-center">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => (state.playing ? onPause() : onPlay())}
                >
                    {state.playing ? <PauseIcon /> : <PlayIcon />}
                </Button>
                <pre>{JSON.stringify(state)}</pre>
            </div>

            <div className="absolute bottom-16 left-0 right-0">
                <Progress
                    value={state.played}
                    max={285}
                    className="h-2 rounded-none"
                />
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <div className="absolute bottom-24 right-10 hidden">
                    <ReactPlayer
                        ref={player}
                        width="100%"
                        height="100%"
                        onPlay={onPlay}
                        onEnded={onEnded}
                        onPause={onPause}
                        url={state.url}
                        playing={state.playing}
                        loop={state.loop}
                        volume={state.volume}
                        muted={state.muted}
                        onProgress={onProgress}
                        onDuration={onDuration}
                    />
                </div>
            </Suspense>
        </div>
    );
};

export default VideoPlayer;
