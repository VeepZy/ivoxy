"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useTransition } from "react";
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
import { useSearchStore } from "../stores/items";

const AppSearch: React.FC = () => {
    const [pending, startTransition] = useTransition();

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const query = useSearchStore((state) => state.query);
    const items = useSearchStore((state) => state.items);
    const nextPageToken = useSearchStore((state) => state.nextPageToken);
    const loadMore = useSearchStore((state) => state.loadMore);
    const setQuery = useSearchStore((state) => state.setQuery);
    const setItems = useSearchStore((state) => state.setItems);
    const setLoadMore = useSearchStore((state) => state.setLoadMore);
    const setNextPageToken = useSearchStore(
        (state) => state.setNextPageToken,
    );

    const createQueryString = useMemo(
        () => (query: string) => {
            const params = new URLSearchParams(searchParams);
            params.set("query", query);

            return params.toString();
        },
        [searchParams],
    );

    const createUrl = useMemo(
        () => (query: string) => {
            const params = createQueryString(query);
            const url = `${pathname}?${params}`;

            return url;
        },
        [pathname, createQueryString],
    );

    const handleSearch = useMemo(
        () => (param: string) => {
            startTransition(async () => {
                const response = await searchQuery(param);

                setItems(response.items);
                setNextPageToken(response.pageToken);
            });
        },
        [searchParams, startTransition, setItems, setNextPageToken],
    );

    const handleMore = useMemo(
        () => () => {
            if (!nextPageToken) {
                return;
            }

            startTransition(async () => {
                const response = await searchMore(query, nextPageToken);

                setItems([...items, ...response.items]);
                setNextPageToken(response.pageToken ?? null);
                setLoadMore(false);
            });
        },
        [
            query,
            startTransition,
            items,
            nextPageToken,
            setItems,
            setNextPageToken,
            setLoadMore,
        ],
    );

    const form = useForm({
        defaultValues: { search: query },
    });

    const onSubmit = ({ search }: { search: string }) => {
        setQuery(search);

        router.push(createUrl(search));
    };

    useEffect(() => {
        if (loadMore) handleMore();
    }, [loadMore, handleMore]);

    useEffect(() => {
        const param = searchParams.get("query");
        const search = form.getValues("search");

        if (!param) {
            return;
        }

        if (param !== search) {
            setQuery(param);
            form.setValue("search", param);
        }

        handleSearch(param);
    }, [searchParams, form, handleSearch, setQuery]);

    return (
        <Form {...form}>
            <form
                className="mb-7 flex w-full items-center rounded-md border pl-4"
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
    );
};

export { AppSearch };
