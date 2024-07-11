"use client";

import { forwardRef } from "react";

import { useMounted } from "@/hooks/mounted";
import { cn } from "@/lib/utils";
import { unescapeHTML } from "@/lib/utils.client";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    title: string;
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
    ({ className, title }, ref) => {
        const mounted = useMounted();

        const truncate = (str: string) => {
            const title = unescapeHTML(str);
            const maxLength = 50;

            if (str.length > maxLength) {
                const truncated = title.slice(0, maxLength).trim();
                return `${truncated}...`;
            }
            return title;
        };

        if (!mounted) {
            return null;
        }

        return (
            <h3
                ref={ref}
                className={cn("font-semibold tracking-tight", className)}
            >
                {truncate(title)}
            </h3>
        );
    },
);
Title.displayName = "Title";

export { Title };
