"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { logout } from "../api/logout";

const SignOut: React.FC = () => {
    return <MenubarItem onClick={() => logout()}>Sign Out</MenubarItem>;
};

export default SignOut;
