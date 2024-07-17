import { create } from "zustand";

import { type SearchStore } from "../types/store";

const useSearchStore = create<SearchStore>((set) => ({
    query: "",
    items: [],
    nextPageToken: null,
    loadMore: false,
    setQuery: (query) => set({ query }),
    setNextPageToken: (nextPageToken) => set({ nextPageToken }),
    setItems: (items) => set({ items }),
    setLoadMore: (loadMore) => set({ loadMore }),
}));

export { useSearchStore };
