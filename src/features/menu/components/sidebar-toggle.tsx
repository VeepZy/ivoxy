"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { useSidebar } from "@/hooks/sidebar";

export const SidebarToggle: React.FC = () => {
    const [show, toggleSidebar] = useSidebar();

    return (
        <MenubarItem onClick={() => toggleSidebar()}>
            {show === "true" ? "Hide Sidebar" : "Show Sidebar"}
        </MenubarItem>
    );
};
