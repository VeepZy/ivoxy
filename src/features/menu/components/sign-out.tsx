"use client";

import { useRouter } from "next/navigation";

import { MenubarItem } from "@/components/ui/menubar";
import { createBrowserDBClient } from "@/db/browser";

const SignOut: React.FC = () => {
    const router = useRouter();

    const logout = async () => {
        const db = createBrowserDBClient();

        const {
            data: { user },
        } = await db.auth.getUser();

        if (user) {
            await db.auth.signOut();
            router.push("/");
        }
    };

    return <MenubarItem onClick={() => logout()}>Sign Out</MenubarItem>;
};

export { SignOut };
