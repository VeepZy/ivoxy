"use client";

import { useEffect } from "react";
import { type ImperativePanelHandle } from "react-resizable-panels";

import { handleStorageChange } from "../api/handle-storage-change";
import { useSidebarStore } from "../store/state";

const useToggleSidebar = (ref: React.RefObject<ImperativePanelHandle>) => {
    const isOpen = useSidebarStore((state) => state.isOpen);
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

    useEffect(() => {
        handleStorageChange(isOpen);

        isOpen ? ref.current?.expand(20) : ref.current?.collapse();
    }, [isOpen, ref]);

    return { isOpen, toggleSidebar };
};

export { useToggleSidebar };
