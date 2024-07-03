"use server";

import { OAuth2Client } from "google-auth-library";
import { redirect } from "next/navigation";
import { assignClient, oAuth2Client } from "./client";
import { cookies } from "next/headers";

export const getAuthenticatedClient = async (
    client: OAuth2Client | null,
) => {
    if (!client) {
        console.log("Creating new client");
        client = await new OAuth2Client(
            process.env.YOUTUBE_CLIENT_ID ?? "",
            process.env.YOUTUBE_CLIENT_SECRET ?? "",
            process.env.YOUTUBE_REDIRECT_URI ?? "",
        );

        const acccess_token = cookies().get("google_access_token");
        const refresh_token = cookies().get("google_refresh_token");
        const expiry_date = cookies().get("google_expiry_date");

        if (acccess_token && refresh_token && expiry_date) {
            client.setCredentials({
                access_token: acccess_token.value,
                refresh_token: refresh_token.value,
                expiry_date: Number(expiry_date.value),
            });
        }

        assignClient(client);
        return client;
    }

    console.log("Returning existing client");
    return client;
};

export const auth = async () => {
    const client = await getAuthenticatedClient(oAuth2Client);

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
