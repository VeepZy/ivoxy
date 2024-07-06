import { type Database } from "./schema";

type PlaylistRow = Database["public"]["Tables"]["playlists"]["Row"];
type SongRow = Database["public"]["Tables"]["songs"]["Row"];

export interface Song extends Omit<SongRow, "data"> {
    data: {
        title: string;
        channelTitle: string;
        url: string;
        thumbnail: string;
    };
}
export interface Playlist extends Omit<PlaylistRow, "data"> {
    data: {
        title: string;
        url: string;
        channelTitle: string;
        thumbnail: string;
    }[];
}

export type SongData = Song["data"];
export type PlaylistData = Playlist["data"];
