import { type Playlist, type Song } from "@/db/types";

export const filter = (playlists: Playlist[], current: string) => {
    return playlists.filter(
        (p) => !p.data.some((item) => item.url === current),
    );
};

export const filterSongs = (songs: Song[], current: string) => {
    return songs.some((p) => p.data.url !== current);
};
