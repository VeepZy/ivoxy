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

const CreatePlaylist: React.FC<{ playlists: Playlist[] }> = ({
    playlists,
}) => {
    const [pending, startTransition] = useTransition();
    const [exists, setExists] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: "",
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
        const playlist = playlists.find((p) => p.name === name);

        if (playlist) {
            setExists(true);
            return;
        }

        startTransition(async () => {
            await createPlaylist(name);
            router.refresh();
        });
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Playlist</DialogTitle>
                <DialogDescription>
                    Create a new playlist to add your favorite songs to.
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
                                    <Input
                                        {...field}
                                        placeholder="Playlist name"
                                    />
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
                    Create
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export { CreatePlaylist };
