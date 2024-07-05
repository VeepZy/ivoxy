"use server";

import { createServerDBClient } from ".";
import { cache } from "react";
import { Playlist } from "./types";

export const getUser = cache(async () => {
    const db = createServerDBClient();

    const {
        data: { user },
        error,
    } = await db.auth.getUser();

    if (!user) {
        return null;
    }

    if (error) {
        throw new Error(error.message);
    }

    return user;
});

export const getPlaylists = cache(async () => {
    const db = createServerDBClient();

    const user = await getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { data, error } = await db
        .from("playlists")
        .select("*")
        .eq("user", user.id)
        .returns<Playlist[]>();

    if (error) {
        throw new Error(`Playlist query error: ${error.message}`);
    }

    return data;
});
