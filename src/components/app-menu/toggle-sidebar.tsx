"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { useSidebarStore } from "@/features/app-sidebar/store/state";

const MenubarSidebarToggle: React.FC = () => {
    const isOpen = useSidebarStore((state) => state.isOpen);
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

    return (
        <MenubarItem onClick={() => toggleSidebar()}>
            {isOpen ? "Hide Sidebar" : "Show Sidebar"}
        </MenubarItem>
    );
};

export { MenubarSidebarToggle };
