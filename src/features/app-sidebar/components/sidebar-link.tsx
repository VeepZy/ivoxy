"use client";

import {
    CirclePlayIcon,
    LayoutGridIcon,
    ListMusicIcon,
    Music2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { type SidebarLink } from "../types/sidebar-link";

const Links: Record<string, SidebarLink> = {
    browse: {
        href: "/browse",
        icon: LayoutGridIcon,
        label: "Browse",
    },
    listenNow: {
        href: "/",
        icon: CirclePlayIcon,
        label: "Listen Now",
    },
    songs: {
        href: "/songs",
        icon: Music2Icon,
        label: "Songs",
    },
    playlists: {
        href: "/playlists",
        icon: ListMusicIcon,
        label: "Playlists",
    },
};

const PlaylistLink = ({
    id,
    name,
}: {
    id: number;
    name: string;
}): SidebarLink => ({
    href: `/playlists/${id}`,
    icon: ListMusicIcon,
    label: name,
});

const AppSidebarLink: React.FC<{
    name: string;
    playlist?: false | { id: number; name: string };
}> = ({ name, playlist = false }) => {
    const pathname = usePathname();
    const link = playlist ? PlaylistLink(playlist) : Links[name];
    const isActive = pathname === link.href;

    return (
        <Button
            asChild
            className="w-full justify-start"
            variant={isActive ? "secondary" : "ghost"}
        >
            <Link href={link.href}>
                <link.icon className="mr-2 h-5 w-5" />
                {link.label}
            </Link>
        </Button>
    );
};

export { AppSidebarLink };
