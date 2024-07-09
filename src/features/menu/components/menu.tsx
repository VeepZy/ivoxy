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
import { getPlaylists, getUser } from "@/db/queries";

import { SidebarToggle } from "./sidebar-toggle";
import { SignIn } from "./sign-in";
import { SignOut } from "./sign-out";
import { ThemeToggle } from "./theme-toggle";
import { CreatePlaylist } from "./create-playlist";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const Menu: React.FC = async () => {
    const user = await getUser();
    const playlists = await getPlaylists();

    return (
        <Dialog>
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
                    <MenubarTrigger className="relative">
                        File
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarSub>
                            <MenubarSubTrigger>New</MenubarSubTrigger>
                            <MenubarSubContent className="w-[230px]">
                                <DialogTrigger asChild>
                                    <MenubarItem>Playlist</MenubarItem>
                                </DialogTrigger>
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
            <CreatePlaylist playlists={playlists} />
        </Dialog>
    );
};

export { Menu };
