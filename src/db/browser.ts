import { createBrowserClient } from "@supabase/ssr";

import { type Database } from "./schema";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const createBrowserDBClient = () =>
    createBrowserClient<Database>(SUPABASE_URL, ANON_KEY);
