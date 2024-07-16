"use client";

import { authSignIn } from "@/db/actions";

import { MenubarItem } from "../ui/menubar";

const MenubarAuthLogin: React.FC = () => {
    return <MenubarItem onClick={authSignIn}>Login</MenubarItem>;
};

export { MenubarAuthLogin };
