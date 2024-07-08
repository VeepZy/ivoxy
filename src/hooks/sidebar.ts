"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";

import { useMounted } from "./mounted";

const useSidebar = () => {
    const mounted = useMounted();

    const setSidebarState = (newValue: string) => {
        if (mounted) {
            window.localStorage.setItem("showSidebar", newValue);
            window.dispatchEvent(
                new StorageEvent("storage", {
                    key: "showSidebar",
                    newValue,
                }),
            );
        }
    };

    const store = useMemo(() => {
        return {
            getSnapshot: () =>
                mounted && window.localStorage.getItem("showSidebar"),
            getServerSnapshot: () => "false",
            subscribe: (listener: () => void) => {
                if (mounted) {
                    window.addEventListener("storage", listener);
                    return () =>
                        window.removeEventListener("storage", listener);
                }

                return () => void 0;
            },
        };
    }, [mounted]);

    useEffect(() => {
        if (mounted && !store.getSnapshot()) {
            window.localStorage.setItem("showSidebar", "true");
        }
    }, [mounted, store]);

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
