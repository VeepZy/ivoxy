"use client";

import Link from "next/link";

import { useDataStore } from "@/hooks/use-data";

import {
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "../ui/menubar";

import { MenubarAuthLogin } from "./auth-login";
import { MenubarAuthLogout } from "./auth-logout";

const MenubarMenuAccount: React.FC = () => {
    const { user } = useDataStore();

    return (
        <MenubarMenu>
            <MenubarTrigger>Account</MenubarTrigger>
            {user ? (
                <MenubarContent>
                    <MenubarItem>
                        <Link href="/profile">Profile</Link>
                    </MenubarItem>
                    <MenubarItem>Settings</MenubarItem>
                    <MenubarSeparator />
                    <MenubarAuthLogout />
                </MenubarContent>
            ) : (
                <MenubarContent>
                    <MenubarAuthLogin />
                </MenubarContent>
            )}
        </MenubarMenu>
    );
};

export { MenubarMenuAccount };
