import { getAuthenticatedClient } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import url from "url";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    let query = url.parse(req.url ?? "", true)?.query;

    if (!query)
        return NextResponse.json(
            { error: "No query provided" },
            { status: 400 },
        );

    if (query.error) {
        return NextResponse.json({ error: query.error }, { status: 400 });
    } else {
        const client = await getAuthenticatedClient();
        const { tokens } = await client.getToken({
            code: query.code?.toString() ?? "",
        });

        if (!tokens)
            return NextResponse.json(
                { error: "No tokens" },
                { status: 400 },
            );

        client.setCredentials(tokens);
        const cookieStore = cookies();
        cookieStore.set(
            "google_access_token",
            tokens.access_token?.toString() ?? "",
        );
        cookieStore.set(
            "google_refresh_token",
            tokens.refresh_token?.toString() ?? "",
        );
        cookieStore.set(
            "google_expiry_date",
            tokens.expiry_date?.toString() ?? "",
        );

        return NextResponse.redirect(new URL("/", req.url));
    }
};
