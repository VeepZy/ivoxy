import { Database } from "./schema";

type PlaylistRow = Database["public"]["Tables"]["playlists"]["Row"];
export interface Playlist extends Omit<PlaylistRow, "data"> {
    data: {
        title: string;
        url: string;
        channelTitle: string;
        thumbnail: string;
    }[];
}
