import "server-only";

import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import type { CookieSerializeOptions } from "cookie";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { type Database } from "./schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import jwt from "jsonwebtoken";

type CookieOptions = Partial<CookieSerializeOptions>;
interface Cookies {
    name: string;
    value: string;
    options: CookieOptions;
}

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
            setAll(cookiesToSet: Cookies[]) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set({ name, value, ...options }),
                    );
                } catch {}
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

    const db = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet: Cookies[]) {
                    cookiesToSet.forEach(({ name, value, options }) =>
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
        },
    );

    await db.auth.getUser();

    return supabaseResponse;
};
