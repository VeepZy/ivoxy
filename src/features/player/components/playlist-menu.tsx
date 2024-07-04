"use client";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { createPlaylist } from "../api/create-playlist";
import { Database } from "@/db/schema";
import { updatePlaylist } from "../api/update-playlist";

type Playlist = Database["public"]["Tables"]["playlists"]["Row"];

const PlaylistMenu: React.FC<{
    playlists: Playlist[];
    currentSong: string;
}> = ({ playlists, currentSong }) => {
    const [pending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [currentPlaylists, setPlaylists] = useState<Playlist[] | []>(
        playlists.filter((p) => !p.urls?.includes(currentSong)),
    );
    const [selectedPlaylist, setSelectedPlaylist] = useState<string>(
        currentPlaylists[0]?.name ?? "",
    );

    const form = useForm({
        defaultValues: {
            playlist: "",
        },
    });

    const onNewPlaylist = (values: { playlist: string }) => {
        console.log(values);
        startTransition(async () => {
            const data = await createPlaylist(values.playlist);
            setPlaylists(data);
        });
    };

    const onUpdatePlaylist = (playlist: string) => {
        startTransition(async () => {
            const current = currentPlaylists.find(
                (p) => p.name === playlist,
            );

            if (!current) {
                return;
            }

            const data = await updatePlaylist({
                ...current,
                urls: [...(current.urls ?? []), currentSong],
            });
            setPlaylists(data);
        });
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    Add to Playlist
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                        Add to Playlist
                    </h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(false)}
                    >
                        <XIcon className="h-5 w-5" />
                    </Button>
                </div>
                <div className="space-y-2">
                    <Select
                        value={selectedPlaylist}
                        onValueChange={(value) =>
                            setSelectedPlaylist(value)
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select playlist" />
                        </SelectTrigger>
                        <SelectContent>
                            {currentPlaylists.map((playlist) => (
                                <SelectItem
                                    value={playlist.name}
                                    key={playlist.id}
                                >
                                    {playlist.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onNewPlaylist)}
                            className="flex items-center gap-2"
                        >
                            <FormField
                                control={form.control}
                                name="playlist"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <Input
                                            placeholder="New playlist name"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                variant="outline"
                                size="icon"
                                type="submit"
                                disabled={pending}
                            >
                                <PlusIcon className="h-4 w-4" />
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => onUpdatePlaylist(selectedPlaylist)}
                    >
                        Add to Playlist
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default PlaylistMenu;

function ChevronDownIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

function PlusIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}

function XIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}
