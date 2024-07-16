"use client";

import { useCallback, useEffect, useState } from "react";

import { type Theme } from "../types/theme";

import { useGetMediaQueryPreference } from "./use-media-preference";

const useStoredTheme = () => {
    const [theme, setTheme] = useState<Theme | null>(null);
    const mediaQueryPreference = useGetMediaQueryPreference();

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }, [setTheme]);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as Theme | null;
        setTheme(storedTheme ?? mediaQueryPreference);
    }, [setTheme, mediaQueryPreference]);

    useEffect(() => {
        theme && localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, toggleTheme] as const;
};

export { useStoredTheme };
