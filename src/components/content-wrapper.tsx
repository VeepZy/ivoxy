"use client";

import { useEffect, useRef } from "react";
import { type ImperativePanelHandle } from "react-resizable-panels";

import { type Playlist } from "@/db/types";
import { Sidebar } from "@/features/sidebar/components/sidebar";
import { useSidebar } from "@/hooks/sidebar";

import { ResizableHandle, ResizablePanel } from "./ui/resizable";

const ContentWrapper: React.FC<{
    playlists: Playlist[];
    children: React.ReactNode;
}> = ({ playlists, children }) => {
    const [state] = useSidebar();

    const ref = useRef<ImperativePanelHandle>(null);

    useEffect(() => {
        if (state === "false") {
            ref.current?.collapse();
        } else {
            ref.current?.expand(20);
        }
    }, [state]);
    return (
        <>
            <ResizablePanel
                ref={ref}
                collapsible
                defaultSize={20}
                minSize={15}
            >
                <Sidebar playlists={playlists} />
            </ResizablePanel>
            {state === "true" && <ResizableHandle withHandle />}
            <ResizablePanel defaultSize={80} minSize={70}>
                {children}
            </ResizablePanel>
        </>
    );
};

export { ContentWrapper };
