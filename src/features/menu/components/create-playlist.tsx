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
import { type Playlist } from "@/db/types";
import { createPlaylist } from "@/features/player/api/create-playlist";
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
                    disabled={pending || exists}
                    type="submit"
                    onClick={() => onSubmit(form.getValues("name"))}
                >
                    Create
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export { CreatePlaylist };
