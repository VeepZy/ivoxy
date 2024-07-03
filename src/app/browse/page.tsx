"use server";

import Search from "@/features/search/components/search";

import type { NextPage } from "next";

const BrowseRoute: NextPage = async () => {
    return (
        <>
            <div className="h-full px-4 py-6 lg:px-8">
                <Search />
            </div>
        </>
    );
};

export default BrowseRoute;
