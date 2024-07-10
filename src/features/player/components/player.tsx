"use client";

import {
    PauseIcon,
    PlayIcon,
    Repeat2Icon,
    SkipBackIcon,
    SkipForwardIcon,
    Volume2Icon,
    VolumeXIcon,
} from "lucide-react";
import { ComponentType, useRef } from "react";
import dynamic from "next/dynamic";
import type ReactPlayer from "react-player";

const Player = dynamic(() => import("react-player"), {
    ssr: false,
}) as unknown as ComponentType<ReactPlayerProps>;

import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { type Playlist, type Song } from "@/db/types";
import { cn, formatDuration } from "@/lib/utils";

import { AddSong } from "./add-song";
import { CurrentSongs } from "./current-songs";
import { PlaylistMenu } from "./playlist-menu";
import { usePlayerStore } from "@/hooks/player";
import { ReactPlayerProps } from "react-player";

const VideoPlayer: React.FC<{ playlists: Playlist[]; songs: Song[] }> = ({
    playlists,
    songs,
}) => {
    const player = useRef<ComponentType<ReactPlayerProps> & ReactPlayer>(
        null,
    );

    const state = usePlayerStore((store) => store.state);
    const onPlay = usePlayerStore((store) => store.events.play);
    const onPause = usePlayerStore((store) => store.events.pause);
    const onEnded = usePlayerStore((store) => store.events.ended);
    const onVolume = usePlayerStore((store) => store.events.volume);
    const onDuration = usePlayerStore((store) => store.events.duration);
    const onProgress = usePlayerStore((store) => store.events.progress);
    const onProgressMouse = usePlayerStore(
        (store) => store.events.progressMouse,
    );
    const onNext = usePlayerStore((store) => store.events.next);
    const onPrev = usePlayerStore((store) => store.events.prev);
    const onMute = usePlayerStore((store) => store.events.mute);
    const onLoop = usePlayerStore((store) => store.events.loop);

    return (
        <div className="flex h-full flex-col">
            <Progress
                className="h-2 rounded-none border-none"
                max={state.duration}
                segments={[
                    { value: state.played },
                    { value: state.loaded, load: true },
                ]}
                onClick={(event) => onProgressMouse(event, player)}
            />
            <div className="flex w-full flex-1 items-center border-t bg-card px-4 shadow-lg">
                <div className="space-y-1 text-sm">
                    <Title title={state.data[state.index].title} />
                    <p className="text-xs text-muted-foreground">
                        {state.data[state.index].channelTitle}
                    </p>
                </div>
                <div className="flex flex-1 items-center justify-center gap-4">
                    <Button
                        disabled={!state.canPrev}
                        size="icon"
                        variant="ghost"
                        onClick={onPrev}
                    >
                        <SkipBackIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            state.playing ? onPause() : onPlay()
                        }
                    >
                        {state.playing ? <PauseIcon /> : <PlayIcon />}
                    </Button>
                    <Button
                        disabled={!state.canNext}
                        size="icon"
                        variant="ghost"
                        onClick={onNext}
                    >
                        <SkipForwardIcon className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={onLoop}>
                        <Repeat2Icon
                            className={cn(
                                state.loop
                                    ? "text-destructive"
                                    : "text-muted-foreground",
                            )}
                        />
                    </Button>
                    <Slider
                        className="max-w-[150px]"
                        defaultValue={[state.volume]}
                        max={1}
                        min={0}
                        step={0.05}
                        onValueChange={onVolume}
                    />
                    <Button size="icon" variant="ghost" onClick={onMute}>
                        {state.muted ? (
                            <VolumeXIcon className="text-muted-foreground/40" />
                        ) : (
                            <Volume2Icon />
                        )}
                    </Button>

                    <div className="flex gap-1">
                        <p>{formatDuration(state.played)}</p>
                        <p>:</p>
                        <p>{formatDuration(state.duration)}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <AddSong songs={songs} />
                    <PlaylistMenu playlists={playlists} />
                    <CurrentSongs />
                </div>

                <div className="absolute bottom-24 left-10 hidden">
                    <Player
                        ref={player}
                        height="100%"
                        loop={state.loop}
                        muted={state.muted}
                        playing={state.playing}
                        url={state.data[state.index].url}
                        volume={state.volume}
                        width="100%"
                        onDuration={onDuration}
                        onEnded={onEnded}
                        onPause={onPause}
                        onPlay={onPlay}
                        onProgress={onProgress}
                    />
                </div>
            </div>
        </div>
    );
};

export { VideoPlayer };
