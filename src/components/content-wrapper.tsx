"use client";

import { useSidebar } from "@/hooks/sidebar";
import { useEffect, useRef } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { ResizableHandle, ResizablePanel } from "./ui/resizable";
import { Sidebar } from "@/features/sidebar/components/sidebar";
import { Playlist } from "@/db/types";

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
                defaultSize={20}
                collapsible
                ref={ref}
                minSize={15}
            >
                <Sidebar playlists={playlists} />
            </ResizablePanel>
            {state === "true" && <ResizableHandle withHandle />}
            <ResizablePanel defaultSize={100} minSize={70}>
                {children}
            </ResizablePanel>
        </>
    );
};

export { ContentWrapper };
