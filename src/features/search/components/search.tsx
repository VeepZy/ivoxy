"use client";

import { type youtube_v3 as Youtube } from "googleapis";
import { SearchIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useTransition,
} from "react";
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

import { searchMore, searchQuery } from "../api/search";

import { Items } from "./items";
import { Playlist, Song, SongData } from "@/db/types";

const Search: React.FC<{ playlists: Playlist[]; songs: Song[] }> = ({
    playlists,
    songs,
}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [pending, startTransition] = useTransition();
    const [items, setItems] = useState<SongData[] | null>(null);
    const [nextPageToken, setNextPageToken] = useState<string | null>(
        null,
    );

    const form = useForm({
        defaultValues: {
            search: "",
        },
    });

    const createQueryString = useMemo(
        () => (query: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("search", query);

            return params.toString();
        },
        [searchParams],
    );

    const handleSearch = useMemo(
        () => (query: string) => {
            startTransition(async () => {
                const response = await searchQuery(query);

                if (!response) {
                    return;
                }

                setItems(response.items);
                setNextPageToken(response?.pageToken ?? null);
            });
        },
        [startTransition],
    );

    const handleMore = useCallback(() => {
        const query = form.getValues("search");

        startTransition(async () => {
            const response = await searchMore(query, nextPageToken ?? "");

            if (!response) {
                return;
            }

            setItems((prevState) => [
                ...(prevState ?? []),
                ...response.items,
            ]);
            setNextPageToken(response.pageToken ?? null);
        });
    }, [startTransition, form, nextPageToken]);

    const onSubmit = (data: { search: string }) => {
        const url = `${pathname}?${createQueryString(data.search)}`;

        window.history.pushState(null, "", url);
    };

    useEffect(() => {
        const query = searchParams.get("search");

        if (query) {
            form.setValue("search", query);

            handleSearch(query);
        }
    }, [searchParams, handleSearch, form]);

    return (
        <div className="flex flex-col space-y-6 p-6">
            <Form {...form}>
                <form
                    className="flex flex-1 items-center rounded-md border pl-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <SearchIcon className="mr-2 h-4 w-4 text-muted-foreground" />

                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        disabled={pending}
                                        placeholder="Search"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        className="ml-2 rounded-bl-none rounded-tl-none"
                        disabled={pending}
                        type="submit"
                        variant="ghost"
                    >
                        Search
                    </Button>
                </form>
            </Form>

            <Items
                items={items}
                more={handleMore}
                pending={pending}
                playlists={playlists}
                songs={songs}
            />
        </div>
    );
};

export { Search };
