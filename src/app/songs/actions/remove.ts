"use server";

import { revalidatePath } from "next/cache";

import { createServerDBClient } from "@/db";
import { type Song } from "@/db/types";

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
