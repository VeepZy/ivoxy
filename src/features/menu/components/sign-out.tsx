"use client";

import { MenubarItem } from "@/components/ui/menubar";

import { useLogout } from "../api/logout";

const SignOut: React.FC = () => {
    const logout = useLogout();

    return <MenubarItem onClick={() => logout}>Sign Out</MenubarItem>;
};

export { SignOut };
