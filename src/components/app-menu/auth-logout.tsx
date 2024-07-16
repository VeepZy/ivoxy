"use client";

import { useRouter } from "next/navigation";

import { createBrowserDBClient } from "@/db/browser";
import { useDataStore } from "@/hooks/use-data";

import { MenubarItem } from "../ui/menubar";


const MenubarAuthLogout: React.FC = () => {
    const router = useRouter();
    const { user } = useDataStore();

    const logout = async () => {
        const db = createBrowserDBClient();

        if (user) {
            await db.auth.signOut();
            router.push("/");
            router.refresh();
        }
    };

    return <MenubarItem onClick={logout}>Logout</MenubarItem>;
};

export { MenubarAuthLogout };
