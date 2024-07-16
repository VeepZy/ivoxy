"use client";

import { useEffect } from "react";

import { type Theme } from "../types/theme";

const useSwitchTheme = (theme: Theme | null) => {
    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            theme === "dark",
        );
    }, [theme]);
};

export { useSwitchTheme };
