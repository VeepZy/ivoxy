"use client";

import { useMounted } from "@/hooks/mounted";
import { unescapeHTML } from "@/lib/utils.client";

const PlaylistTitle: React.FC<{ title: string }> = ({ title }) => {
    const mounted = useMounted();

    if (!mounted) {
        return null;
    }

    return (
        <h3 className="font-semibold leading-none">
            {unescapeHTML(title)}
        </h3>
    );
};

export default PlaylistTitle;
