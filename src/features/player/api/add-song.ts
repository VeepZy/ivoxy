"use server";

import { createServerDBClient } from "@/db";
import { getUser } from "@/db/queries";

export const addSong = async (data: {
    title: string;
    channelTitle: string;
    url: string;
    thumbnail: string;
}) => {
    const db = createServerDBClient();
    const user = await getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { error } = await db.from("songs").insert({
        user: user.id,
        data,
    });

    if (error) {
        throw new Error(error.message);
    }
};
