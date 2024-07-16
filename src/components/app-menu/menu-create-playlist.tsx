"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { createPlaylist } from "@/db/actions";
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


const DialogContentCreatePlaylist: React.FC = () => {
    const [pending, startTransition] = useTransition();
    const [exists, setExists] = useState(false);

    const { playlists } = useDataStore();

    const form = useForm({
        defaultValues: { name: "" },
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
            await createPlaylist(form.getValues("name"));
        });
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Playlist</DialogTitle>
                <DialogDescription>
                    Create a new playlist
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
                    Create Playlist
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export { DialogContentCreatePlaylist };
