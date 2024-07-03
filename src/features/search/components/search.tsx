"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { searchQuery } from "../api/search";
import { useState } from "react";
import { youtube_v3 } from "googleapis";
import Items from "./items";
import { Separator } from "@/components/ui/separator";

const Search: React.FC = () => {
    const [items, setItems] = useState<youtube_v3.Schema$SearchResult[]>(
        [],
    );

    const form = useForm({
        defaultValues: {
            search: "",
        },
    });

    const onSubmit = async (data: { search: string }) => {
        const response = await searchQuery(data.search);
        if (!response) return;
        console.log(response);
        setItems(response);
    };

    return (
        <div className="h-full space-y-6">
            <div className="space-between flex items-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="search"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Search"
                                            className="w-max-[300px]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
            <div className="flex flex-col">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Search results
                    </h2>
                    <p className="text-muted-foreground">
                        {items.length} results found
                    </p>
                </div>
                <Separator className="my-4" />
                <Items items={items} />
            </div>
        </div>
    );
};

export default Search;
