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

    return {
        items: response.data.items,
        pageToken: response.data.nextPageToken,
    };
});

export const searchMore = cache(
    async (query: string, pageToken: string) => {
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
            pageToken,
        });

        return {
            items: response.data.items,
            pageToken: response.data.nextPageToken,
        };
    },
);
