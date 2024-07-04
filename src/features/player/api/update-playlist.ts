"use server";

import { createServerDBClient } from "@/db";
import { Database } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type Playlist = Database["public"]["Tables"]["playlists"]["Row"];

export const updatePlaylist = async (playlist: Playlist) => {
    const db = await createServerDBClient();
    const { getUser } = getKindeServerSession();
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
        .eq("user_id", user.id)
        .eq("id", playlist.id)
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
