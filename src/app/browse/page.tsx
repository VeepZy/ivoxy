"use server";

import type { NextPage } from "next";

import { Search } from "@/features/search/components/search";
import { ScrollArea } from "@/components/ui/scroll-area";

const BrowseRoute: NextPage = () => {
    return (
        <ScrollArea className="max-h-full overflow-y-auto">
            <Search />
        </ScrollArea>
    );
};

export default BrowseRoute;
