"use client";

import { useRef } from "react";
import { type ImperativePanelHandle } from "react-resizable-panels";

import {
    ResizableHandle,
    ResizablePanel,
} from "@/components/ui/resizable";
import { useDataStore } from "@/hooks/use-data";

import { useToggleSidebar } from "../hooks/use-toggle-sidebar";

import { AppSidebarLink } from "./sidebar-link";

const AppSidebar: React.FC = () => {
    const { playlists } = useDataStore();

    const ref = useRef<ImperativePanelHandle>(null);
    const { isOpen } = useToggleSidebar(ref);

    return (
        <>
            <ResizablePanel
                ref={ref}
                collapsible
                defaultSize={20}
                minSize={15}
            >
                <aside className="space-y-4 py-4 pb-20">
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            Discover
                        </h2>
                        <div className="space-y-1">
                            <AppSidebarLink name="listenNow" />
                            <AppSidebarLink name="browse" />
                        </div>
                    </div>
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            Library
                        </h2>
                        <div className="space-y-1">
                            <AppSidebarLink name="playlists" />
                            <AppSidebarLink name="songs" />
                        </div>
                    </div>
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            Playlists
                        </h2>

                        <div className="space-y-1">
                            {playlists.map((playlist) => (
                                <AppSidebarLink
                                    key={playlist.id}
                                    name="playlist"
                                    playlist={{
                                        id: playlist.id,
                                        name: playlist.name,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </aside>
            </ResizablePanel>
            {isOpen ? <ResizableHandle withHandle /> : null}
        </>
    );
};

export { AppSidebar };
