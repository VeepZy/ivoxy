"use client";

import { MenubarItem } from "@/components/ui/menubar";

import { signIn } from "../api/sign-in";
import { Button } from "@/components/ui/button";

const SignIn: React.FC<{ item?: boolean }> = ({ item = false }) => {
    if (!item) {
        return <Button onClick={() => signIn()}>Sign In</Button>;
    }

    return <MenubarItem onClick={() => signIn()}>Sign In</MenubarItem>;
};

export { SignIn };
