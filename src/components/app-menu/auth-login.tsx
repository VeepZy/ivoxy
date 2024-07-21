"use client";

import { authSignIn } from "@/db/actions";
import { useMounted } from "@/hooks/mounted";

import { MenubarItem } from "../ui/menubar";

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
