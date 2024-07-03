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

const Search: React.FC = () => {
    const form = useForm({
        defaultValues: {
            search: "",
        },
    });

    const onSubmit = async (data: { search: string }) => {
        const response = await searchQuery(data.search);
        console.log(response);
    };

    return (
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
    );
};

export default Search;
