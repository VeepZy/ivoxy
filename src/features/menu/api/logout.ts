"use client";

import { createBrowserDBClient } from "@/db/browser";
import { useRouter } from "next/navigation";

export const logout = async () => {
    const db = createBrowserDBClient();
    const router = useRouter();

    const {
        data: { user },
    } = await db.auth.getUser();

    if (user) {
        await db.auth.signOut();
        router.push("/");
    }
};
