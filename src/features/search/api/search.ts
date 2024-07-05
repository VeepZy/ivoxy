"use server";

import { google } from "googleapis";

import { getAuthenticatedClient } from "@/lib/auth";

export const searchQuery = async (query: string) => {
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
        maxResults: 10,
    });

    return response.data.items;
};
