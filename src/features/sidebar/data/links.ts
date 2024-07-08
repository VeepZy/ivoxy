import {
    CirclePlayIcon,
    LayoutGridIcon,
    ListMusicIcon,
    Music2Icon,
    RadioIcon,
} from "lucide-react";

interface Playlist {
    id: number;
    name: string;
}

const Links = (playlist?: Playlist) => ({
    playlists: {
        href: "/playlists",
        icon: ListMusicIcon,
        label: "Playlists",
    },
    playlist: {
        href: `/playlists/${playlist?.id.toString() ?? "0"}`,
        icon: ListMusicIcon,
        label: playlist?.name ?? "",
    },
    songs: {
        href: "/songs",
        icon: Music2Icon,
        label: "Songs",
    },
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
    radio: {
        href: "/radio",
        icon: RadioIcon,
        label: "Radio",
    },
});

export { Links };
