"use client";

import {
    type ReactNode,
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";

export const ThemeContext = createContext<{
    theme: "dark" | "light" | null;
    toggleTheme: () => void;
}>({
    theme: null,
    toggleTheme: () => undefined,
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState<"dark" | "light" | null>(null);

    const getMediaQueryPreference = useCallback(() => {
        const mediaQuery = "(prefers-color-scheme: dark)";
        const mql = window.matchMedia(mediaQuery);
        const hasPreference = typeof mql.matches === "boolean";

        if (hasPreference) {
            return mql.matches ? "dark" : "light";
        }

        return "light";
    }, []);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");

        if (storedTheme) {
            setTheme(storedTheme as "dark" | "light");
        } else {
            setTheme(getMediaQueryPreference());
        }
    }, [setTheme, getMediaQueryPreference]);

    useEffect(() => {
        switch (theme) {
            case "dark":
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", theme);
                break;
            case "light":
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", theme);
                break;
            default:
                break;
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
