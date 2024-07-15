"use server";

import type { NextPage } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "@/features/search/components/search";
import { getPlaylists, getSongs } from "@/db/queries";

const BrowseRoute: NextPage = async () => {
    const [songs, playlists] = await Promise.all([
        getSongs(),
        getPlaylists(),
    ]);

    const cookieStore = cookies();

    if (!cookieStore.get("google_access_token")) {
        redirect("/profile");
    }

    return (
        <ScrollArea className="max-h-full overflow-y-auto">
            <Search playlists={playlists} songs={songs} />
        </ScrollArea>
    );
};

export default BrowseRoute;
