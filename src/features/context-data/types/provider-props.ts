import type { User } from "@supabase/supabase-js";
import type { ReactNode } from "react";

import type { Playlist, Song } from "@/db/types";

interface DataProviderProps {
    user: User | null;
    songs: Song[];
    playlists: Playlist[];
    children: ReactNode;
}

export type { DataProviderProps };
