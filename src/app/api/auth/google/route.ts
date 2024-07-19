import url from "node:url";

import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { getClient } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
    const cookieStore = cookies();
    const query = url.parse(req.url, true).query;

    if (query.error) {
        return NextResponse.json({ error: query.error }, { status: 400 });
    }
    const client = await getClient();
    const { tokens } = await client.getToken({
        code: query.code?.toString() ?? "",
    });

    const accessToken = tokens.access_token?.toString() ?? "";
    const refreshToken = tokens.refresh_token?.toString() ?? "";
    const oneWeek = Date.now() + 7 * 24 * 60 * 60 * 1000;

    cookieStore.set("google_access_token", accessToken, {
        expires: oneWeek,
    });
    cookieStore.set("google_refresh_token", refreshToken, {
        expires: oneWeek,
    });

    client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
        expiry_date: oneWeek,
    });

    return NextResponse.redirect(new URL("/", req.url));
};
