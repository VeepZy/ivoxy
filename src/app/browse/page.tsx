"use server";

import type { NextPage } from "next";

import { Search } from "@/features/search/components/search";

const BrowseRoute: NextPage = () => {
    return (
        <div className="h-full px-4 pb-24 pt-6 lg:px-8">
            <Search />
        </div>
    );
};

export default BrowseRoute;
