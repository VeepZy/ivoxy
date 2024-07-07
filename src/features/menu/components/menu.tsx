"use server";

import Link from "next/link";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { getUser } from "@/db/queries";

import { SignIn } from "./sign-in";
import { SignOut } from "./sign-out";
import { ThemeToggle } from "./theme-toggle";
import { SidebarToggle } from "./sidebar-toggle";

const Menu: React.FC = async () => {
    const user = await getUser();

    return (
        <Menubar className="rounded-none border-none px-2 lg:px-4">
            <MenubarMenu>
                <MenubarTrigger className="font-bold">
                    Ivoxy
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>About Ivoxy</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Preferences</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Quit</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger className="relative">File</MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>New</MenubarSubTrigger>
                        <MenubarSubContent className="w-[230px]">
                            <MenubarItem>Playlist</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>Show Playing Next</MenubarItem>
                    <SidebarToggle />
                    <MenubarItem>Enter Full Screen</MenubarItem>
                    <ThemeToggle />
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Account</MenubarTrigger>
                {user ? (
                    <MenubarContent>
                        <MenubarItem>
                            <Link href="/profile">Profile</Link>
                        </MenubarItem>
                        <MenubarItem>Settings</MenubarItem>
                        <MenubarSeparator />
                        <SignOut />
                    </MenubarContent>
                ) : (
                    <MenubarContent>
                        <SignIn item />
                        <MenubarSeparator />
                    </MenubarContent>
                )}
            </MenubarMenu>
        </Menubar>
    );
};

export { Menu };
