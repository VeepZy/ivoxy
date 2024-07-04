"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createServerDBClient } from ".";
import { cache } from "react";

export const getPlaylists = cache(async () => {
    const db = await createServerDBClient();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { data, error } = await db
        .from("playlists")
        .select("*")
        .eq("user_id", user.id);

    if (error) {
        throw new Error(error.message);
    }

    return data;
});
