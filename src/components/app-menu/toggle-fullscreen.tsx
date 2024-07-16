"use client";

import { useEffect, useState } from "react";

import { MenubarItem } from "../ui/menubar";

const MenubarToggleFullscreen: React.FC = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = async () => {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
        } else {
            const element = document.documentElement;

            await element.requestFullscreen();
        }
    };

    useEffect(() => {
        setIsFullscreen(document.fullscreenElement !== null);
    }, []);

    return (
        <MenubarItem
            className="flex items-center gap-2"
            onClick={toggleFullscreen}
        >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </MenubarItem>
    );
};

export { MenubarToggleFullscreen };
