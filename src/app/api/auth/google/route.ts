import url from "node:url";

import { type NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getAuthenticatedClient } from "@/lib/auth";

export const GET = async (req: NextApiRequest) => {
    const cookieStore = cookies();
    const query = url.parse(req.url ?? "", true).query;

    if (query.error) {
        return NextResponse.json({ error: query.error }, { status: 400 });
    }
    const client = await getAuthenticatedClient();
    const { tokens } = await client.getToken({
        code: query.code?.toString() ?? "",
    });

    client.setCredentials(tokens);

    cookieStore.set(
        "google_access_token",
        tokens.access_token?.toString() ?? "",
        {
            expires: Date.now() + (tokens.expiry_date ?? 0),
        },
    );
    cookieStore.set(
        "google_refresh_token",
        tokens.refresh_token?.toString() ?? "",
        {
            expires: Date.now() + (tokens.expiry_date ?? 0),
        },
    );
    cookieStore.set(
        "google_expiry_date",
        tokens.expiry_date?.toString() ?? "",
        {
            expires: Date.now() + (tokens.expiry_date ?? 0),
        },
    );

    return NextResponse.redirect(new URL("/", req.url));
};
