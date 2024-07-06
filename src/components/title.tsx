"use client";

import { useMounted } from "@/hooks/mounted";
import { unescapeHTML } from "@/lib/utils.client";

const Title: React.FC<{ title: string }> = ({ title }) => {
    const mounted = useMounted();

    if (!mounted) {
        return null;
    }

    return (
        <h3 className="font-semibold tracking-tight">
            {unescapeHTML(title)}
        </h3>
    );
};

export { Title };
