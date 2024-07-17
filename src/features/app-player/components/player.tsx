"use client";

import dynamic from "next/dynamic";
import { AppPlayerProgress } from "./player-progress";
import type { Player } from "../types/player-ref";
import { AppPlayerData } from "./player-data";
import { AppPlayerControls } from "./player-controls";
import { AppPlayerDuration } from "./player-duration";
import { useRef } from "react";
import { AppPlayerSave } from "./player-save";
import { AppPlayerPlaylistMenu } from "./player-playlist-menu";
import { AppPlayerMixMenu } from "./player-mix-menu";

const Player = dynamic(() => import("react-player"), {
    ssr: false,
}) as unknown as Player;

const AppPlayer = () => {
    const playerRef = useRef<Player>(null);

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

            <Player ref={playerRef} height="100%" width="100%" />
        </div>
    );
};

export { AppPlayer };
