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
import {
    type MouseEvent,
    Suspense,
    useContext,
    useEffect,
    useRef,
} from "react";
import ReactPlayer from "react-player";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { type Playlist } from "@/db/types";
import { useMounted } from "@/hooks/mounted";
import { cn, formatDuration } from "@/lib/utils";
import { unescapeHTML } from "@/lib/utils.client";

import { PlayerContext } from "./context";
import { PlaylistMenu } from "./playlist-menu";

const VideoPlayer: React.FC<{ playlists: Playlist[] }> = ({
    playlists,
}) => {
    const player = useRef<ReactPlayer>(null);
    const { state, setState } = useContext(PlayerContext);

    const isMounted = useMounted();

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            canNext: state.index < state.data.length - 1,
            canPrev: state.index > 0,
        }));
    }, [state.data, state.index]);

    if (!isMounted) {
        return null;
    }

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
    const onEnded = () => {
        const next = state.data[state.index + 1];

        if (!next) {
            setState((prevState) => ({
                ...prevState,
                playing: false,
            }));
            return;
        }

        setState((prevState) => ({
            ...prevState,
            index: state.index + 1,
        }));
    };

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
        if (!state.canNext) {
            return;
        }

        setState((prevState) => ({
            ...prevState,
            index: state.index + 1,
        }));
    };
    const onPrev = () => {
        if (!state.canPrev) {
            return;
        }

        setState((prevState) => ({
            ...prevState,
            index: state.index - 1,
        }));
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 flex h-16 w-full items-center border-t bg-card px-4 shadow-lg">
            <div className="space-y-1 text-sm">
                <h3 className="font-semibold leading-none">
                    {unescapeHTML(state.data[state.index].title)}
                </h3>
                <p className="text-xs text-muted-foreground">
                    {state.data[state.index].channelTitle}
                </p>
            </div>
            <div className="flex flex-1 items-center justify-center gap-4">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={onPrev}
                    disabled={!state.canPrev}
                >
                    <SkipBackIcon className="h-4 w-4" />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => (state.playing ? onPause() : onPlay())}
                >
                    {state.playing ? <PauseIcon /> : <PlayIcon />}
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={onNext}
                    disabled={!state.canNext}
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

            <PlaylistMenu playlists={playlists} />

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
            </Suspense>
        </div>
    );
};

export { VideoPlayer };
