import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const unescapeHTML = (html: string) => {
    const parser = new DOMParser();
    return (
        parser.parseFromString(html, "text/html").body.textContent ?? ""
    );
};
