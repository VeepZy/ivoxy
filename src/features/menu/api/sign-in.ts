"use server";

import { createServerDBClient } from "@/db";
import { redirect } from "next/navigation";

export const signIn = async () => {
    const db = createServerDBClient();
    const { data, error } = await db.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: "http://localhost:3000/api/auth/callback",
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    if (data.url) {
        redirect(data.url);
    }
};
