"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "../api/sign-in";
import { MenubarItem } from "@/components/ui/menubar";

const SignIn: React.FC = () => {
    return <MenubarItem onClick={() => signIn()}>Sign In</MenubarItem>;
};

export default SignIn;
