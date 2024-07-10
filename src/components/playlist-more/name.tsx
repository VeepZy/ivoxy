"use client";

import { Playlist } from "@/db/types";
import { useForm } from "react-hook-form";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPlaylist } from "@/features/player/api/create-playlist";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { renamePlaylist } from "@/db/actions";

const PlaylistRenameButton: React.FC<{
    playlists: Playlist[];
    playlist: Playlist;
    setOpen: (open: boolean) => void;
}> = ({ playlists, playlist, setOpen }) => {
    const [pending, startTransition] = useTransition();
    const [exists, setExists] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: playlist.name,
        },
    });

    const debounce = (func: Function, delay: number) => {
        let timer: NodeJS.Timeout;

        return (...args: any) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const onInputChange = debounce(async (name: string) => {
        const playlist = playlists.find((p) => p.name === name);

        playlist ? setExists(true) : setExists(false);
    }, 500);

    const onSubmit = (name: string) => {
        if (exists) return;

        startTransition(async () => {
            await renamePlaylist(playlist, name);
            setOpen(false);
            router.refresh();
        });
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Rename Playlist</DialogTitle>
                <DialogDescription>
                    Rename {playlist.name} to a new name.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form>
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl
                                    onChange={() =>
                                        onInputChange(
                                            form.getValues("name"),
                                        )
                                    }
                                >
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription
                                    className={cn(
                                        exists ? "text-red-500" : "",
                                    )}
                                >
                                    {exists
                                        ? "Playlist already exists"
                                        : "Enter a name for your playlist"}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            <DialogFooter>
                <Button
                    type="submit"
                    disabled={pending || exists}
                    onClick={() => onSubmit(form.getValues("name"))}
                >
                    Rename
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export { PlaylistRenameButton };
