"use server";

import { revalidatePath } from "next/cache";

import { createServerDBClient } from "@/db";
import { getUser } from "@/db/queries";
import { type Playlist } from "@/db/types";

export const updatePlaylist = async (playlist: Playlist) => {
    const db = createServerDBClient();
    const user = await getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { error } = await db
        .from("playlists")
        .update({
            name: playlist.name,
            data: playlist.data,
        })
        .eq("user", user.id)
        .eq("id", playlist.id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
};
