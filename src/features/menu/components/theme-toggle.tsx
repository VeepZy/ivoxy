"use client";

import { useContext } from "react";

import { MenubarItem } from "@/components/ui/menubar";
import { ThemeContext } from "@/features/theme/components/context";


export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <MenubarItem onClick={() => toggleTheme()}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </MenubarItem>
    );
};
