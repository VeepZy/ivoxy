"use server";

import { google } from "googleapis";

import { getAuthenticatedClient } from "@/lib/auth";

import { mapToItem } from "../utils/map-to-item";

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
        maxResults: 40,
    });

    if (!response.data.items) {
        return {
            items: [],
            pageToken: "",
        };
    }

    const items = response.data.items.map(mapToItem);

    return {
        items,
        pageToken: response.data.nextPageToken,
    };
};

export const searchMore = async (query: string, nextPageToken: string) => {
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
        pageToken: nextPageToken,
    });

    if (!response.data.items) {
        return {
            items: [],
            pageToken: "",
        };
    }

    const items = response.data.items.map(mapToItem);

    return {
        items,
        pageToken: response.data.nextPageToken,
    };
};
