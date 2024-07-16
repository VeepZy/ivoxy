"use client";

import { DataContext } from "../stores/context";
import { DataStore } from "../stores/data";
import { type DataProviderProps } from "../types/provider-props";

const DataProvider: React.FC<Readonly<DataProviderProps>> = ({
    user,
    songs,
    playlists,
    children,
}) => {
    const store = DataStore({ user, songs, playlists });

    return (
        <DataContext.Provider value={store}>
            {children}
        </DataContext.Provider>
    );
};

export { DataProvider };
