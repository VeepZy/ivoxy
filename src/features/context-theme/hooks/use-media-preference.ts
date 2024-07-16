"use client";

import { useCallback } from "react";

import { useMounted } from "@/hooks/mounted";

import { type Theme } from "../types/theme";

const useGetMediaQueryPreference = (): Theme => {
    const mounted = useMounted();

    const getMediaQueryPreference = useCallback(() => {
        const mediaQuery = "(prefers-color-scheme: dark)";
        const mql = window.matchMedia(mediaQuery);

        return mql.matches ? "dark" : "light";
    }, []);

    return mounted ? getMediaQueryPreference() : "light";
};

export { useGetMediaQueryPreference };
