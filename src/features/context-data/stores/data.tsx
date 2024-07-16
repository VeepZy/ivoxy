import { create } from "zustand";

import { type DataStoreProps } from "../types/store-data";

const DataStore = (props: DataStoreProps) => {
    const { user, songs, playlists } = props;

    return create<DataStoreProps>(() => ({
        user,
        songs,
        playlists,
    }));
};

export { DataStore };
