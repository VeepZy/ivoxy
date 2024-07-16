import type { User } from "@supabase/supabase-js";

import type { Playlist, Song } from "@/db/types";

interface DataStoreProps {
    user: User | null;
    songs: Song[] | [];
    playlists: Playlist[] | [];
}

export type { DataStoreProps };
