import { type SongData } from "@/db/types";

interface SearchStore {
    query: string;
    items: SongData[];
    nextPageToken: string | null | undefined;
    loadMore: boolean;
    setQuery: (query: string) => void;
    setNextPageToken: (nextPageToken: string | null | undefined) => void;
    setItems: (items: SongData[]) => void;
    setLoadMore: (loadMore: boolean) => void;
}

export type { SearchStore };
