import { Playlist } from "@/db/types";

export const filter = (playlists: Playlist[], current: string) => {
    return playlists.filter(
        (p) => !p.data.some((item) => item.url === current),
    );
};
