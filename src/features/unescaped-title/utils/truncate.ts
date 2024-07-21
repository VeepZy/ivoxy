import { unescapeHTML } from "./unescape-html";

const truncate = (title: string, limit?: number) => {
    const unescaped = unescapeHTML(title);
    const maxLength = limit ?? 75;

    if (unescaped.length > maxLength) {
        const truncated = unescaped.slice(0, maxLength).trim();
        return `${truncated}...`;
    }

    return unescaped;
};

export { truncate };
