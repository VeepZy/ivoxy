"use client";

import { authSignIn } from "@/db/actions";

import { MenubarItem } from "../ui/menubar";
import { useMounted } from "@/hooks/mounted";

const MenubarAuthLogin: React.FC = () => {
    const mounted = useMounted();

    if (!mounted) {
        return null;
    }

    return (
        <MenubarItem onClick={() => authSignIn(window.location.origin)}>
            Login
        </MenubarItem>
    );
};

export { MenubarAuthLogin };
