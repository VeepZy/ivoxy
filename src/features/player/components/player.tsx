"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { usePlayerState } from "@/hooks/state";
import {
    PauseIcon,
    PlayIcon,
    Repeat1Icon,
    Repeat2Icon,
    RepeatIcon,
    Volume2Icon,
    VolumeXIcon,
} from "lucide-react";
import {
    FormEvent,
    FormEventHandler,
    MouseEvent,
    MouseEventHandler,
    Suspense,
    useContext,
    useRef,
} from "react";
import ReactPlayer from "react-player";
import { PlayerContext } from "./context";
import { Slider } from "@/components/ui/slider";
import { formatDuration } from "@/lib/utils";
import { unescapeHTML } from "@/lib/utils.client";
import PlaylistMenu from "./playlist-menu";
import { Database } from "@/db/schema";

type Playlist = Database["public"]["Tables"]["playlists"]["Row"];

const VideoPlayer: React.FC<{ playlists: Playlist[] }> = ({
    playlists,
}) => {
    const player = useRef<ReactPlayer>(null);
    const { state, setState, setUrl } = useContext(PlayerContext);

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
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => (state.playing ? onPause() : onPlay())}
                >
                    {state.playing ? <PauseIcon /> : <PlayIcon />}
                </Button>
                <Button size="icon" variant="ghost" onClick={onLoop}>
                    {state.loop ? (
                        <Repeat2Icon />
                    ) : (
                        <Repeat2Icon className="text-muted-foreground/40" />
                    )}
                </Button>
                <Slider
                    defaultValue={[state.volume]}
                    onValueChange={onVolume}
                    min={0}
                    max={1}
                    step={0.05}
                    className="max-w-[150px]"
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
                    playlists={playlists}
                    currentSong={state.url}
                />
            </div>

            <div className="absolute bottom-16 left-0 right-0">
                <Progress
                    value={state.played}
                    max={state.duration}
                    className="h-2 rounded-none border-none"
                    onClick={onProgressChange}
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
