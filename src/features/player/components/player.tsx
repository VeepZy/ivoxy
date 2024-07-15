"use client";

import {
    PauseIcon,
    PlayIcon,
    Repeat2Icon,
    ShuffleIcon,
    SkipBackIcon,
    SkipForwardIcon,
    Volume2Icon,
    VolumeXIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { type ComponentType, useEffect, useRef } from "react";
import type ReactPlayer from "react-player";
import { type ReactPlayerProps } from "react-player";

import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { type Playlist, type Song } from "@/db/types";
import {
    onBufferEnd,
    onDuration,
    onEnded,
    onPause,
    onPlay,
    onProgress,
    setDuration,
    setNext,
    setPrev,
    setSeek,
    setVolume,
    toggleLoop,
    toggleMute,
    togglePlay,
    toggleShuffle,
    updateNextAndPrev,
    usePlayerStore,
} from "@/hooks/player";
import { cn, formatDuration } from "@/lib/utils";

import { AddSong } from "./add-song";
import { CurrentSongs } from "./current-songs";
import { PlaylistMenu } from "./playlist-menu";

const Player = dynamic(() => import("react-player"), {
    ssr: false,
}) as unknown as ComponentType<ReactPlayerProps>;

const VideoPlayer: React.FC<{ playlists: Playlist[]; songs: Song[] }> = ({
    playlists,
    songs,
}) => {
    const player = useRef<ComponentType<ReactPlayerProps> & ReactPlayer>(
        null,
    );

    const playing = usePlayerStore((store) => store.playing);
    const duration = usePlayerStore((store) => store.duration);
    const loop = usePlayerStore((store) => store.loop);
    const shuffle = usePlayerStore((store) => store.shuffle);
    const data = usePlayerStore((store) => store.data);
    const index = usePlayerStore((store) => store.index);
    const volume = usePlayerStore((store) => store.volume);
    const muted = usePlayerStore((store) => store.muted);
    const played = usePlayerStore((store) => store.played);
    const loaded = usePlayerStore((store) => store.loaded);
    const canNext = usePlayerStore((store) => store.canNext);
    const canPrev = usePlayerStore((store) => store.canPrev);

    useEffect(() => {
        if (data) {
            updateNextAndPrev(index < data.length - 1, index > 0);
        }
    }, [data, index]);

    return (
        <div className="flex h-full flex-col">
            <Progress
                className="h-2 rounded-none border-none"
                max={duration}
                segments={[
                    { value: played },
                    { value: loaded, load: true },
                ]}
                onClick={(event) => setSeek(event, player)}
            />
            <div className="flex w-full flex-1 items-center border-t bg-card px-4 shadow-lg">
                {data ? (
                    <>
                        <div className="relative mr-2 h-10 w-10 overflow-hidden rounded-md border border-primary/50  shadow-lg dark:border-primary/30">
                            <Image
                                alt={data[index].title}
                                className="aspect-square object-cover transition-all hover:scale-105"
                                height={120}
                                src={data[index].thumbnail}
                                width={320}
                            />
                        </div>
                        <div className="space-y-1 text-sm">
                            <Title title={data[index].title} />
                            <p className="text-xs text-muted-foreground">
                                {data[index].channelTitle}
                            </p>
                        </div>{" "}
                    </>
                ) : null}
                <div className="flex flex-1 items-center justify-center gap-4">
                    <Button
                        disabled={!canPrev}
                        size="icon"
                        variant="ghost"
                        onClick={setPrev}
                    >
                        <SkipBackIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={togglePlay}
                    >
                        {playing ? <PauseIcon /> : <PlayIcon />}
                    </Button>
                    <Button
                        disabled={!canNext}
                        size="icon"
                        variant="ghost"
                        onClick={setNext}
                    >
                        <SkipForwardIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={toggleLoop}
                    >
                        <Repeat2Icon
                            className={cn(
                                loop
                                    ? "text-destructive"
                                    : "text-muted-foreground",
                            )}
                        />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={toggleShuffle}
                    >
                        <ShuffleIcon
                            className={cn(
                                shuffle
                                    ? "text-destructive"
                                    : "text-muted-foreground",
                            )}
                        />
                    </Button>
                    <Slider
                        className="max-w-[150px]"
                        defaultValue={[volume]}
                        max={1}
                        min={0}
                        step={0.05}
                        onValueChange={setVolume}
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={toggleMute}
                    >
                        {muted ? (
                            <VolumeXIcon className="text-muted-foreground/40" />
                        ) : (
                            <Volume2Icon />
                        )}
                    </Button>

                    <div className="flex gap-1">
                        <p>{formatDuration(played)}</p>
                        <p>:</p>
                        <p>{formatDuration(duration)}</p>
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
                        loop={loop}
                        muted={muted}
                        playing={playing}
                        url={data?.[index].url ?? undefined}
                        volume={volume}
                        width="100%"
                        onEnded={onEnded}
                        onPause={onPause}
                        onPlay={onPlay}
                        onBufferEnd={() => onBufferEnd(player)}
                        onProgress={onProgress}
                    />
                </div>
            </div>
        </div>
    );
};

export { VideoPlayer };
