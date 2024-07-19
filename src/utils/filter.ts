import { Playlist, Song } from "@/db/types";

export const filterPlaylists = (
    playlists: Playlist[],
    current: string,
    inverse = false,
) => {
    return playlists.filter((p) => {
        if (inverse) {
            return p.data.some((item) => item.url === current);
        }

        return !p.data.some((item) => item.url === current);
    });
};

export const isSavedSong = (songs: Song[], current: string) => {
    return songs.some((p) => p.data.url === current);
};
