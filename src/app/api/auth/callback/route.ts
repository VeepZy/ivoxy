import { type NextRequest, NextResponse } from "next/server";

import { createServerDBClient } from "@/db";

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    if (code) {
        const db = createServerDBClient();

        const { error } = await db.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    return NextResponse.redirect(
        `${origin}?error=${encodeURIComponent("Failed to exchange code for session")}`,
    );
}
