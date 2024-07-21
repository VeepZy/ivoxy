"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

import { usePlayerStore } from "@/stores/player";

import type { Player } from "../types/player-ref";

import { AppPlayerControls } from "./player-controls";
import { AppPlayerData } from "./player-data";
import { AppPlayerDuration } from "./player-duration";
import { AppPlayerMixMenu } from "./player-mix-menu/mix";
import { AppPlayerPlaylistMenu } from "./player-playlist-menu";
import { AppPlayerProgress } from "./player-progress";
import { AppPlayerSave } from "./player-save";

const Player = dynamic(() => import("react-player"), {
    ssr: false,
}) as unknown as Player;

const AppPlayer = () => {
    const playerRef = useRef<Player>(null);

    const onProgress = usePlayerStore((store) => store.onProgress);
    const onEnded = usePlayerStore((store) => store.onEnded);
    const onPlay = usePlayerStore((store) => store.onPlay);
    const onPause = usePlayerStore((store) => store.onPause);

    const setDuration = usePlayerStore((store) => store.setDuration);
    const setCanNext = usePlayerStore((store) => store.setCanNext);
    const setCanPrevious = usePlayerStore((store) => store.setCanPrevious);

    const isPlaying = usePlayerStore((store) => store.isPlaying);
    const isLooped = usePlayerStore((store) => store.isLooped);

    const data = usePlayerStore((store) => store.data);
    const index = usePlayerStore((store) => store.currentIndex);
    const volume = usePlayerStore((store) => store.volume);

    const onBufferEnd = () => {
        const duration = Math.round(playerRef.current?.getDuration() ?? 0);
        setDuration(duration);
    };

    useEffect(() => {
        if (!data) {
            return;
        }

        onPlay();

        setCanNext(index < data.length - 1);
        setCanPrevious(index > 0);
    }, [data, index, onPlay, setCanNext, setCanPrevious]);

    if (!data?.[index]) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <h3>Select a song or playlist</h3>
            </div>
        );
    }

    return (
        <div className="flex-1">
            <AppPlayerProgress player={playerRef} />

            <div className="flex h-full items-center justify-between gap-4 px-4">
                <AppPlayerData />

                <div className="flex items-center justify-center gap-4">
                    <AppPlayerControls />
                    <AppPlayerDuration />
                </div>

                <div className="space-x-2 justify-self-end">
                    <AppPlayerSave />
                    <AppPlayerPlaylistMenu />
                    <AppPlayerMixMenu />
                </div>
            </div>

            <div className="hidden">
                <Player
                    ref={playerRef}
                    height="100%"
                    loop={isLooped}
                    playing={isPlaying}
                    url={data[index].url}
                    volume={volume}
                    width="100%"
                    config={{
                        youtube: {
                            playerVars: {
                                autoplay: 1,
                            },
                        },
                    }}
                    onBufferEnd={onBufferEnd}
                    onEnded={onEnded}
                    onPause={onPause}
                    onPlay={onPlay}
                    onProgress={onProgress}
                />
            </div>
        </div>
    );
};

export { AppPlayer };
