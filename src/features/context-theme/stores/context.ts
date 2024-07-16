"use client";

import { createContext } from "react";

import { type Theme } from "../types/theme";

const ThemeContext = createContext<{
    theme: Theme;
    toggleTheme: () => void;
}>({
    theme: "light",
    toggleTheme: () => undefined,
});

export { ThemeContext };
