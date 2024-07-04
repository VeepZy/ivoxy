"use client";

export const unescapeHTML = (html: string) => {
    const parser = new DOMParser();
    return (
        parser.parseFromString(html, "text/html").body.textContent ?? ""
    );
};
