"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { updatePlaylist } from "@/db/actions";
import { type Playlist } from "@/db/types";
import { useDataStore } from "@/hooks/use-data";

import { Button } from "../ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const DropdownMenuDialogRename: React.FC<{ playlist: Playlist }> = ({
    playlist,
}) => {
    const [pending, startTransition] = useTransition();
    const [exists, setExists] = useState(true);

    const { playlists } = useDataStore();

    const form = useForm({
        defaultValues: { name: playlist.name },
    });

    const debounce = (func: () => void, delay: number) => {
        let timer: NodeJS.Timeout;

        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => func(), delay);
        };
    };

    const onInputChange = debounce(() => {
        const value = form.getValues("name");
        const playlist = playlists.find((p) => p.name === value);

        setExists(Boolean(playlist));
    }, 250);

    const onSubmit = () => {
        if (exists) return;

        startTransition(async () => {
            const name = form.getValues("name");

            await updatePlaylist({
                ...playlist,
                name,
            });
        });
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Rename Playlist</DialogTitle>
                <DialogDescription>
                    Change the name of {playlist.name}
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl onChange={onInputChange}>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    {exists
                                        ? "Playlist already exists"
                                        : "Enter a name for the playlist"}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            <DialogFooter>
                <Button disabled={pending || exists} onClick={onSubmit}>
                    Rename Playlist
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export { DropdownMenuDialogRename };
