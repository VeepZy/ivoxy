"use server";

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
import {
    LoginLink,
    RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

const Menu: React.FC = async () => {
    const { getUser } = getKindeServerSession();
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
                    <MenubarItem>Hide Sidebar</MenubarItem>
                    <MenubarItem>Enter Full Screen</MenubarItem>
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
                        <MenubarItem>Logout</MenubarItem>
                    </MenubarContent>
                ) : (
                    <MenubarContent>
                        <MenubarItem>
                            <LoginLink>Sign In</LoginLink>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <RegisterLink>Register</RegisterLink>
                        </MenubarItem>
                    </MenubarContent>
                )}
            </MenubarMenu>
        </Menubar>
    );
};

export default Menu;
