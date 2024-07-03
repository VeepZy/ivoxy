"use server";

import { getAuthenticatedClient } from "@/lib/auth";
import { oAuth2Client } from "@/lib/client";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

export const searchQuery = async (query: string) => {
    const client = await getAuthenticatedClient(oAuth2Client);

    const youtube = google.youtube({
        auth: client,
        version: "v3",
    });

    console.log(process.env.YOUTUBE_API_KEY);

    const response = await youtube.search.list({
        auth: client,
        part: ["snippet"],
        q: query,
        maxResults: 10,
    });

    return response.data.items;
};
