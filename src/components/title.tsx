"use client";

import { useMounted } from "@/hooks/mounted";
import { cn } from "@/lib/utils";
import { unescapeHTML } from "@/lib/utils.client";
import { forwardRef } from "react";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    title: string;
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
    ({ className, title }, ref) => {
        const mounted = useMounted();

        if (!mounted) {
            return null;
        }

        return (
            <h3
                className={cn("font-semibold tracking-tight", className)}
                ref={ref}
            >
                {unescapeHTML(title)}
            </h3>
        );
    },
);
Title.displayName = "Title";

export { Title };
