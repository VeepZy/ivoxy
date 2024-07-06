"use server";

import { OAuth2Client } from "google-auth-library";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getAuthenticatedClient = async () => {
    const client = await new OAuth2Client(
        process.env.YOUTUBE_CLIENT_ID ?? "",
        process.env.YOUTUBE_CLIENT_SECRET ?? "",
        process.env.YOUTUBE_REDIRECT_URI ?? "",
    );

    const accessToken = cookies().get("google_access_token");
    const refreshToken = cookies().get("google_refresh_token");
    const expiryDate = cookies().get("google_expiry_date");

    if (accessToken && refreshToken && expiryDate) {
        client.setCredentials({
            access_token: accessToken.value,
            refresh_token: refreshToken.value,
            expiry_date: Number(expiryDate.value),
        });
    }

    return client;
};

export const auth = async () => {
    const client = await getAuthenticatedClient();

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
