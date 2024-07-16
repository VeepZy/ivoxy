"use client";

import { createContext } from "react";
import { type StoreApi, type UseBoundStore } from "zustand";

import { type DataStoreProps } from "../types/store-data";

const DataContext = createContext<UseBoundStore<
    StoreApi<DataStoreProps>
> | null>(null);

export { DataContext };
