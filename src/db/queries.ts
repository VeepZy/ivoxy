"use server";

import { cache } from "react";

import { type Playlist, type Song } from "./types";

import { createServerDBClient } from ".";

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

export const getPlaylist = cache(async (id: string) => {
    const db = createServerDBClient();

    const user = await getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { data, error } = await db
        .from("playlists")
        .select("*")
        .eq("id", Number(id))
        .eq("user", user.id)
        .returns<Playlist[]>()
        .single();

    if (error) {
        throw new Error(`Playlist query error: ${error.message}`);
    }

    return data;
});

export const getPlaylists = cache(async () => {
    const db = createServerDBClient();

    const user = await getUser();

    if (!user) {
        return [];
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

export const getSongs = cache(async () => {
    const db = createServerDBClient();

    const user = await getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await db
        .from("songs")
        .select("*")
        .eq("user", user.id)
        .returns<Song[]>();

    if (error) {
        throw new Error(`Song query error: ${error.message}`);
    }

    return data;
});
