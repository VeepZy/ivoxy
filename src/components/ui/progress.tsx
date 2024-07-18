"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

type ProgressSegment = { value: number; load?: boolean };

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
        segments: ProgressSegment[];
    }
>(({ className, segments, max, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
            className,
        )}
        {...props}
    >
        {segments.map((segment, index) => (
            <ProgressPrimitive.Indicator
                key={index}
                className={cn(
                    "absolute h-full w-full transition-all",
                    segment.load ? `bg-primary/20` : "bg-primary",
                )}
                style={{
                    transform: `translateX(-${100 - (segment.value / (max || 100)) * 100}%)`,
                    zIndex: segments.length - index,
                }}
            />
        ))}
    </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
