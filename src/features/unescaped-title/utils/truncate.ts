import { unescapeHTML } from "./unescape-html";

const truncate = (title: string) => {
    const unescaped = unescapeHTML(title);
    const maxLength = 75;

    if (unescaped.length > maxLength) {
        const truncated = unescaped.slice(0, maxLength).trim();
        return `${truncated}...`;
    }

    return unescaped;
};

export { truncate };
