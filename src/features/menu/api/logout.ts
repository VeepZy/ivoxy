"use client";

import { useRouter } from "next/navigation";

import { createBrowserDBClient } from "@/db/browser";

export const useLogout = async () => {
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
