"use client";

import { create } from "zustand";

interface RemoveStore {
    isHolding: boolean;
    fill: number;
    timeout: number;
    ref: NodeJS.Timeout | null;
    setIsHolding: (isHolding: boolean) => void;
    setFill: (fill: number) => void;
    startTimeout: () => void;
    cleanUpTimeout: () => void;
}

export const useRemoveStore = create<RemoveStore>((set, get) => ({
    isHolding: false,
    fill: 0,
    timeout: 2000,
    ref: null,
    setIsHolding: (isHolding) => set({ isHolding }),
    setFill: (fill) => set({ fill }),
    startTimeout: () => {
        if (!get().ref && get().isHolding) {
            const startTime = Date.now();
            const ref = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                const fill = Math.min(
                    (elapsedTime / get().timeout) * 100,
                    100,
                );
                set({ fill });
                if (fill >= 100) {
                    clearInterval(ref);
                }
            }, 10);

            set({ ref });
        }
    },
    cleanUpTimeout: () => {
        const ref = get().ref;

        if (ref && !get().isHolding) {
            clearInterval(ref);
            set({ ref: null });
        }
    },
}));
