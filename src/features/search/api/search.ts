"use server";

import { google } from "googleapis";
import { cache } from "react";

import { getAuthenticatedClient } from "@/lib/auth";

export const searchQuery = cache(async (query: string) => {
    const client = await getAuthenticatedClient();

    const youtube = google.youtube({
        auth: client,
        version: "v3",
    });

    const response = await youtube.search.list({
        auth: client,
        part: ["snippet"],
        type: ["video"],
        q: query,
        maxResults: 40,
    });

    console.log("YOUTUBE API CALL", response);

    return response.data.items;
});
