const createUrl: (path: string) => string = (path) => {
    let url =
        process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000/";

    // Trim the URL and remove trailing slash if exists.
    url = url.replace(/\/+$/, "");
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Ensure path starts without a slash to avoid double slashes in the final URL.
    const trimmedPath = path.replace(/^\/+/, "");

    // Concatenate the URL and the path.
    return trimmedPath ? `${url}/${path}` : url;
};

export { createUrl };
