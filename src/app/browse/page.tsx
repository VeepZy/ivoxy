// "use server";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AppSearchItems } from "@/features/app-search/components/items";
import { AppSearch } from "@/features/app-search/components/search";
import { NextPage } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BrowseRoute: NextPage = () => {
    const cookieStore = cookies();

    if (!cookieStore.get("google_access_token")) {
        redirect("/profile");
    }

    return (
        <ScrollArea className="max-h-full overflow-y-auto p-6">
            <AppSearch />
            <AppSearchItems />
        </ScrollArea>
    );
};

export default BrowseRoute;
