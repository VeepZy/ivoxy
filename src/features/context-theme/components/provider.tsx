"use client";

import { useStoredTheme } from "../hooks/use-stored-theme";
import { useSwitchTheme } from "../hooks/use-switch-theme";
import { ThemeContext } from "../stores/context";

const ThemeProvider: React.FC<Readonly<{ children: React.ReactNode }>> = ({
    children,
}) => {
    const [theme, toggleTheme] = useStoredTheme();

    useSwitchTheme(theme);

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

export { ThemeProvider };
