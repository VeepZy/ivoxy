"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { renamePlaylist } from "@/db/actions";
import { type Playlist } from "@/db/types";
import { cn } from "@/lib/utils";

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

    const debounce = (func: (...args: any) => void, delay: number) => {
        let timer: NodeJS.Timeout;

        return (...args: any) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const onInputChange = debounce((name: string) => {
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
                        control={form.control}
                        name="name"
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
                    disabled={pending || exists}
                    type="submit"
                    onClick={() => onSubmit(form.getValues("name"))}
                >
                    Rename
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export { PlaylistRenameButton };
