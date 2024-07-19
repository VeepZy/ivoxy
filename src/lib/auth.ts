"use server";

import { OAuth2Client } from "google-auth-library";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getClient = async () => {
    const client = new OAuth2Client(
        process.env.YOUTUBE_CLIENT_ID ?? "",
        process.env.YOUTUBE_CLIENT_SECRET ?? "",
        process.env.YOUTUBE_REDIRECT_URI ?? "",
    );

    await Promise.resolve(() => client);

    return client;
};

export const getAuthenticatedClient = async () => {
    const client = await getClient();

    const cookieStore = cookies();
    const credentials = {
        access_token: cookieStore.get("google_access_token")?.value,
        refresh_token: cookieStore.get("google_refresh_token")?.value,
    };

    if (!credentials.access_token || !credentials.refresh_token) {
        redirect("/profile");
    }

    client.setCredentials({
        access_token: credentials.access_token,
        refresh_token: credentials.refresh_token,
    });

    return client;
};

export const auth = async () => {
    const client = await getClient();

    const scopes = [
        "https://www.googleapis.com/auth/youtube",
        "https://www.googleapis.com/auth/youtube.readonly",
    ];

    const authorizationUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        include_granted_scopes: true,
        prompt: "consent",
    });

    return redirect(authorizationUrl);
};
