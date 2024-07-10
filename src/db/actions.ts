"use server";

import { revalidatePath } from "next/cache";
import { createServerDBClient } from ".";
import { getUser } from "./queries";
import { Playlist, Song } from "./types";

export const removePlaylist = async (playlist: Playlist) => {
    const db = createServerDBClient();

    const user = await getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { error } = await db
        .from("playlists")
        .delete()
        .eq("id", playlist.id)
        .eq("user", user.id);

    if (error) {
        throw error;
    }

    revalidatePath("/", "layout");
};

export const renamePlaylist = async (playlist: Playlist, name: string) => {
    const db = createServerDBClient();

    const user = await getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { error } = await db
        .from("playlists")
        .update({
            name,
        })
        .eq("id", playlist.id)
        .eq("user", user.id);

    if (error) {
        throw error;
    }

    revalidatePath("/", "layout");
};

export const removeSong = async (song: Song) => {
    const db = createServerDBClient();

    const { error } = await db
        .from("songs")
        .delete()
        .eq("id", song.id)
        .eq("user", song.user);

    if (error) {
        throw new Error(`Unable to remove song: ${error.message}`);
    }

    revalidatePath("/songs");
};
