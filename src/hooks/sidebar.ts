"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useMounted } from "./mounted";

const useSidebar = () => {
    const mounted = useMounted();

    const setSidebarState = (newValue: string) => {
        if (mounted) {
            window.localStorage.setItem("showSidebar", newValue);
            window.dispatchEvent(
                new StorageEvent("storage", {
                    key: "showSidebar",
                    newValue: newValue,
                }),
            );
        }
    };

    const store = {
        getSnapshot: () => window.localStorage.getItem("showSidebar"),
        getServerSnapshot: () => "false",
        subscribe: (listener: () => void) => {
            if (mounted) {
                window.addEventListener("storage", listener);
                return () =>
                    void window.removeEventListener("storage", listener);
            }

            return () => void 0;
        },
    };

    useEffect(() => {
        if (mounted && !store.getSnapshot()) {
            window.localStorage.setItem("showSidebar", "true");
        }
    }, [mounted]);

    const state = useSyncExternalStore(
        store.subscribe,
        store.getSnapshot,
        store.getServerSnapshot,
    );

    const handleToggle = () => {
        setSidebarState(state === "true" ? "false" : "true");
    };

    return [state, handleToggle] as const;
};

export { useSidebar };
