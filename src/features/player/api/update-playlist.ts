"use server";

import { createServerDBClient } from "@/db";
import { getUser } from "@/db/queries";
import { type Database } from "@/db/schema";

type Playlist = Database["public"]["Tables"]["playlists"]["Row"];

export const updatePlaylist = async (playlist: Playlist) => {
    const db = createServerDBClient();
    const user = await getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { data, error } = await db
        .from("playlists")
        .update({
            name: playlist.name,
            urls: playlist.urls,
        })
        .eq("user", user.id)
        .eq("id", playlist.id)
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
