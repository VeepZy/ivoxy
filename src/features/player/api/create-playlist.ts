"use server";

import { createServerDBClient } from "@/db";
import { getUser } from "@/db/queries";
import { type Playlist } from "@/db/types";

export const createPlaylist = async (playlist: string) => {
    const db = createServerDBClient();
    const user = await getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { data, error } = await db
        .from("playlists")
        .insert({
            name: playlist,
            user: user.id,
            data: [],
        })
        .select("*")
        .returns<Playlist[]>();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
