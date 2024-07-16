"use client";

import { forwardRef } from "react";

import { useMounted } from "@/hooks/mounted";
import { cn } from "@/lib/utils";

import { type TitleProps } from "../types/title-props";
import { truncate } from "../utils/truncate";

const UnescapedTitle = forwardRef<HTMLHeadingElement, TitleProps>(
    ({ className, title }, ref) => {
        const mounted = useMounted();

        return (
            <h3
                ref={ref}
                className={cn("font-semibold tracking-tight", className)}
            >
                {mounted ? truncate(title) : "Loading..."}
            </h3>
        );
    },
);

UnescapedTitle.displayName = "UnescapedTitle";

export { UnescapedTitle };
