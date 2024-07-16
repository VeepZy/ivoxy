"use client";

import { create } from "zustand";

import { type SidebarState } from "../types/store";

const useSidebarStore = create<SidebarState>((set) => ({
    isOpen: true,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export { useSidebarStore };
