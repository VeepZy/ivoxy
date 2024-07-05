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
import { type MouseEvent, Suspense, useContext, useRef } from "react";
import ReactPlayer from "react-player";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { type Database } from "@/db/schema";
import { formatDuration } from "@/lib/utils";
import { unescapeHTML } from "@/lib/utils.client";

import { PlayerContext } from "./context";
import { PlaylistMenu } from "./playlist-menu";

type Playlist = Database["public"]["Tables"]["playlists"]["Row"];

const VideoPlayer: React.FC<{ playlists: Playlist[] }> = ({
    playlists,
}) => {
    const player = useRef<ReactPlayer>(null);
    const { state, setState } = useContext(PlayerContext);

    const onPlay = () =>
        setState((prevState) => ({
            ...prevState,
            playing: true,
        }));
    const onPause = () =>
        setState((prevState) => ({
            ...prevState,
            playing: false,
        }));
    const onEnded = () =>
        setState((prevState) => ({
            ...prevState,
            playing: false,
        }));
    const onProgress = (event: {
        playedSeconds: number;
        loadedSeconds: number;
    }) =>
        setState((prevState) => ({
            ...prevState,
            played: event.playedSeconds,
        }));
    const onDuration = (duration: number) =>
        setState((prevState) => ({
            ...prevState,
            duration,
        }));
    const onLoop = () => {
        setState((prevState) => ({
            ...prevState,
            loop: !prevState.loop,
        }));
    };
    const onVolume = (event: number[]) => {
        console.log(event);
        setState((prevState) => ({
            ...prevState,
            volume: (prevState.volume = event[0]),
        }));
    };
    const onMute = () => {
        setState((prevState) => ({
            ...prevState,
            muted: !prevState.muted,
        }));
    };
    const onProgressChange = (event: MouseEvent<HTMLDivElement>) => {
        const x = event.clientX;
        const width = event.currentTarget.clientWidth;

        const progress = Math.floor((x / width) * state.duration);
        player.current?.seekTo(progress, "seconds");
    };
    const onNext = () => {
        const next = state.url[1];

        if (!next) {
            return;
        }

        setState((prevState) => ({
            ...prevState,
            url: [next, ...prevState.url.slice(1)],
            played: 0,
            loaded: 0,
            playing: true,
        }));
    };
    const onPrev = () => {
        const prev = state.url[state.url.length - 2];

        if (!prev) {
            return;
        }

        setState((prevState) => ({
            ...prevState,
            url: [prev, ...prevState.url.slice(0, -1)],
            played: 0,
            loaded: 0,
            playing: true,
        }));
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 flex h-16 w-full items-center border-t bg-card px-4 shadow-lg">
            <div className="space-y-1 text-sm">
                <h3 className="font-semibold leading-none">
                    {unescapeHTML(state.title)}
                </h3>
                <p className="text-xs text-muted-foreground">
                    {state.channelTitle}
                </p>
            </div>
            <div className="flex flex-1 items-center justify-center gap-4">
                <Button size="icon" variant="ghost" onClick={onPrev}>
                    <SkipBackIcon className="h-4 w-4" />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => (state.playing ? onPause() : onPlay())}
                >
                    {state.playing ? <PauseIcon /> : <PlayIcon />}
                </Button>
                <Button size="icon" variant="ghost" onClick={onNext}>
                    <SkipForwardIcon className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={onLoop}>
                    {state.loop ? (
                        <Repeat2Icon />
                    ) : (
                        <Repeat2Icon className="text-muted-foreground/40" />
                    )}
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

                <PlaylistMenu
                    currentSong={state.url[0]}
                    playlists={playlists}
                />
            </div>

            <div className="absolute bottom-16 left-0 right-0">
                <Progress
                    className="h-2 rounded-none border-none"
                    max={state.duration}
                    value={state.played}
                    onClick={onProgressChange}
                />
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <div className="absolute bottom-24 right-10 hidden">
                    <ReactPlayer
                        ref={player}
                        height="100%"
                        loop={state.loop}
                        muted={state.muted}
                        playing={state.playing}
                        url={state.url}
                        volume={state.volume}
                        width="100%"
                        onDuration={onDuration}
                        onEnded={onEnded}
                        onPause={onPause}
                        onPlay={onPlay}
                        onProgress={onProgress}
                    />
                </div>
            </Suspense>
        </div>
    );
};

export { VideoPlayer };
