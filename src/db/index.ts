import "server-only";

import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { type Database } from "./schema";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? "";
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const createAdminDBClient = () =>
    createClient<Database>(SUPABASE_URL, SECRET_KEY, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    });

export const createServerDBClient = () => {
    const cookieStore = cookies();

    return createServerClient<Database>(SUPABASE_URL, ANON_KEY, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(
                cookiesToSet: {
                    name: string;
                    value: string;
                    options?: CookieOptions;
                }[],
            ) {
                cookiesToSet.forEach(({ name, value, options }) =>
                    cookieStore.set({ name, value, ...options }),
                );
            },
        },
    });
};

export const updateSession = async (request: NextRequest) => {
    let supabaseResponse = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const db = createServerClient(SUPABASE_URL, ANON_KEY, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(
                cookiesToSet: {
                    name: string;
                    value: string;
                    options?: CookieOptions;
                }[],
            ) {
                cookiesToSet.forEach(({ name, value }) =>
                    request.cookies.set(name, value),
                );
                supabaseResponse = NextResponse.next({
                    request,
                });
                cookiesToSet.forEach(({ name, value, options }) =>
                    supabaseResponse.cookies.set(name, value, options),
                );
            },
        },
    });

    await db.auth.getUser();

    return supabaseResponse;
};
