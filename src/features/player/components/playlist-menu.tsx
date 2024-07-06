"use client";

import { ChevronDownIcon, PlusIcon, XIcon } from "lucide-react";
import {
    useCallback,
    useContext,
    useEffect,
    useState,
    useTransition,
} from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { type Playlist } from "@/db/types";

import { createPlaylist } from "../api/create-playlist";
import { updatePlaylist } from "../api/update-playlist";

import { PlayerContext } from "./context";

const PlaylistMenu: React.FC<{
    playlists: Playlist[];
}> = ({ playlists }) => {
    const [pending, startTransition] = useTransition();
    const [open, setOpen] = useState<boolean>(false);

    const { state } = useContext(PlayerContext);

    const [currentPlaylists, setCurrentPlaylists] = useState<
        Playlist[] | []
    >([]);

    const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");

    const form = useForm({
        defaultValues: { name: "" },
    });

    const filter = useCallback(
        (playlists: Playlist[], current: string) => {
            return playlists.filter(
                (p) => !p.data.some((item) => item.url === current),
            );
        },
        [],
    );

    useEffect(() => {
        setCurrentPlaylists(
            filter(playlists, state.data[state.index].url),
        );
    }, [playlists, state.data, state.index, filter]);

    const onNewPlaylist = (values: { name: string }) => {
        startTransition(async () => {
            const data = await createPlaylist(values.name);
            setCurrentPlaylists(data);
            setSelectedPlaylist(values.name);
        });
    };

    const onUpdatePlaylist = (name: string) => {
        startTransition(async () => {
            const current = currentPlaylists.find((p) => p.name === name);

            if (!current) {
                return;
            }

            await updatePlaylist({
                ...current,
                data: [
                    ...current.data,
                    {
                        title: state.data[state.index].title,
                        url: state.data[state.index].url,
                        channelTitle: state.data[state.index].channelTitle,
                        thumbnail: state.data[state.index].thumbnail,
                    },
                ],
            });
            setCurrentPlaylists(
                filter(playlists, state.data[state.index].url),
            );
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
            <PopoverContent align="end" className="w-80 space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                        Add to Playlist
                    </h3>
                    <Button
                        size="icon"
                        variant="ghost"
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
                                    key={playlist.id}
                                    value={playlist.name}
                                >
                                    {playlist.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Form {...form}>
                        <form
                            className="flex items-center gap-2"
                            onSubmit={form.handleSubmit(onNewPlaylist)}
                        >
                            <FormField
                                control={form.control}
                                name="name"
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
                                disabled={pending}
                                size="icon"
                                type="submit"
                                variant="outline"
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
                        disabled={pending}
                        onClick={() => onUpdatePlaylist(selectedPlaylist)}
                    >
                        Add to Playlist
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export { PlaylistMenu };
