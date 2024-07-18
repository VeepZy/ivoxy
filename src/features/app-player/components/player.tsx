"use client";

import dynamic from "next/dynamic";
import { AppPlayerProgress } from "./player-progress";
import type { Player } from "../types/player-ref";
import { AppPlayerData } from "./player-data";
import { AppPlayerControls } from "./player-controls";
import { AppPlayerDuration } from "./player-duration";
import { useEffect, useRef } from "react";
import { AppPlayerSave } from "./player-save";
import { AppPlayerPlaylistMenu } from "./player-playlist-menu";
import { AppPlayerMixMenu } from "./player-mix-menu/mix";
import { usePlayerStore } from "@/stores/player";

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

        setCanNext(index < data.length - 1);
        setCanPrevious(index > 0);
    }, [data, index]);

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
                    width="100%"
                    url={data?.[index].url ?? undefined}
                    onEnded={onEnded}
                    onProgress={onProgress}
                    onBuffer={() => console.log("onBuffer")}
                    onBufferEnd={onBufferEnd}
                    onPlay={onPlay}
                    onPause={onPause}
                    volume={volume}
                    playing={isPlaying}
                    loop={isLooped}
                    config={{
                        youtube: {
                            playerVars: {
                                autoplay: 1,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export { AppPlayer };
