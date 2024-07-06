"use client";

import { unescapeHTML } from "@/lib/utils.client";

const PlaylistTitle: React.FC<{ title: string }> = ({ title }) => {
    return (
        <h3 className="font-semibold leading-none">
            {unescapeHTML(title)}
        </h3>
    );
};

export default PlaylistTitle;
