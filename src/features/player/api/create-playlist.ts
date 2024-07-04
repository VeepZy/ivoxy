"use server";

import { createServerDBClient } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const createPlaylist = async (playlist: string) => {
    const db = await createServerDBClient();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { data, error } = await db
        .from("playlists")
        .insert({
            name: playlist,
            user_id: user.id,
        })
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
