"use server";

import type { NextPage } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "@/features/search/components/search";

const BrowseRoute: NextPage = () => {
    const cookieStore = cookies();

    if (!cookieStore.get("google_access_token")) {
        redirect("/profile");
    }

    return (
        <ScrollArea className="max-h-full overflow-y-auto">
            <Search />
        </ScrollArea>
    );
};

export default BrowseRoute;
