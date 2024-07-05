"use client";

import { MenubarItem } from "@/components/ui/menubar";

import { signIn } from "../api/sign-in";

const SignIn: React.FC = () => {
    return <MenubarItem onClick={() => signIn()}>Sign In</MenubarItem>;
};

export { SignIn };
