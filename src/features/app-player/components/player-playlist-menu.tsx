"use client";

import { ListPlusIcon, PlusIcon, XIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
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
import { useToast } from "@/components/ui/use-toast";
import { createPlaylist, updatePlaylist } from "@/db/actions";
import { type Playlist } from "@/db/types";
import { useDataStore } from "@/hooks/use-data";
import { usePlayerStore } from "@/stores/player";
import { filterPlaylists } from "@/utils/filter";

const AppPlayerPlaylistMenu = () => {
    const [pending, startTransition] = useTransition();
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("");
    const [filtered, setFiltered] = useState<Playlist[]>([]);

    const form = useForm({
        defaultValues: { name: "" },
    });

    const { playlists } = useDataStore();
    const { toast } = useToast();

    const data = usePlayerStore((state) => state.data);
    const index = usePlayerStore((state) => state.currentIndex);

    const createNew = ({ name }: { name: string }) =>
        startTransition(async () => {
            await createPlaylist(name);

            setSelected(name);

            toast({
                title: "Success",
                description: `${name} has been created.`,
            });
        });

    const addToPlaylist = () =>
        startTransition(async () => {
            const playlist = filtered.find((p) => p.name === selected);

            if (!playlist || !data) {
                toast({
                    title: "Error",
                    description: "Unable to add to playlist",
                    variant: "destructive",
                });

                return;
            }

            await updatePlaylist({
                ...playlist,
                data: [...playlist.data, { ...data[index] }],
            });

            toast({
                title: "Success",
                description: `${data[index].title} has been added to ${playlist.name}.`,
            });
        });

    useEffect(() => {
        const filter = data
            ? filterPlaylists(playlists, data[index].url)
            : [];

        setFiltered(filter);
        setSelected(filter[0]?.name ?? "");
    }, [playlists, data, index]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    className="flex-shrink-0"
                    size="icon"
                    variant="outline"
                >
                    <ListPlusIcon className="h-5 w-5" />
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
                    <Select value={selected} onValueChange={setSelected}>
                        <SelectTrigger
                            className="w-full"
                            disabled={filtered.length === 0}
                        >
                            <SelectValue placeholder="Select a playlist" />
                        </SelectTrigger>
                        <SelectContent>
                            {filtered.map((playlist) => (
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
                            onSubmit={form.handleSubmit(createNew)}
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Create new playlist"
                                            />
                                        </FormControl>
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
                    <Button variant="ghost" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        disabled={pending || !selected}
                        onClick={addToPlaylist}
                    >
                        Add to Playlist
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export { AppPlayerPlaylistMenu };
