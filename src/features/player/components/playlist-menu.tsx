"use client";

import { ListPlusIcon, PlusIcon, XIcon } from "lucide-react";
import { useState, useTransition } from "react";
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
import { usePlaylists } from "../hooks/playlists";

const PlaylistMenu: React.FC<{
    playlists: Playlist[];
}> = ({ playlists }) => {
    const [pending, startTransition] = useTransition();
    const [open, setOpen] = useState<boolean>(false);

    const { data, index, current, handleUpdate, selected, setSelected } =
        usePlaylists(playlists);

    const form = useForm({
        defaultValues: { name: "" },
    });

    const createNew = () =>
        startTransition(async () => {
            const name = form.getValues("name");

            const playlist = await createPlaylist(name);
            setSelected(name);
            handleUpdate(playlist);
        });

    const update = () =>
        startTransition(async () => {
            const playlist = current.find((p) => p.name === selected);

            if (!playlist || !data) {
                // HANDLE ERROR
                return;
            }

            await updatePlaylist({
                ...playlist,
                data: [...playlist.data, { ...data[index] }],
            });

            handleUpdate(current.filter((p) => p.name !== selected));
        });

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <ListPlusIcon className="h-4 w-4" />
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
                            disabled={current.length === 0}
                        >
                            <SelectValue placeholder="Select playlist" />
                        </SelectTrigger>
                        <SelectContent>
                            {current.map((playlist) => (
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
                        disabled={pending || !selected}
                        onClick={update}
                    >
                        Add to Playlist
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export { PlaylistMenu };
