"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getUser } from "./queries";
import { type Playlist, type Song, type SongData } from "./types";

import { createServerDBClient } from ".";
import { createUrl } from "@/utils/url";

export const authSignIn = async () => {
    const db = createServerDBClient();
    const { data, error } = await db.auth.signInWithOAuth({
        provider: "github",
        options: {
            // redirectTo: "http://localhost:3000/api/auth/callback",
            redirectTo: `${createUrl("/api/auth/callback")}`,
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    if (data.url) {
        redirect(data.url);
    }
};

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
        throw new Error(`Unable to remove playlist: ${error.message}`);
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
        throw new Error(`Unable to rename playlist: ${error.message}`);
    }

    revalidatePath("/", "layout");
};

export const addSong = async (song: SongData) => {
    const db = createServerDBClient();

    const user = await getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { error } = await db.from("songs").insert({
        data: song,
        user: user.id,
    });

    if (error) {
        throw new Error(`Unable to add song: ${error.message}`);
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

export const createPlaylist = async (name: string) => {
    const db = createServerDBClient();
    const user = await getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { error } = await db.from("playlists").insert({
        name,
        data: [],
        user: user.id,
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
};
