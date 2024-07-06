"use client";

import { useMounted } from "@/hooks/mounted";
import { unescapeHTML } from "@/lib/utils.client";

const Title: React.FC<{ title: string }> = ({ title }) => {
    const mounted = useMounted();

    if (!mounted) {
        return null;
    }

    return (
        <h1 className="text-3xl font-bold tracking-tight">
            {unescapeHTML(title)}
        </h1>
    );
};

export { Title };
