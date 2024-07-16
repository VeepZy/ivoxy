"use client";

import { useEffect, useRef, useState, useTransition } from "react";

const useRemove = (action: () => Promise<void>) => {
    const [pending, startTransition] = useTransition();
    const [fill, setFill] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout>();

    const startTimeout = () => {
        if (intervalRef.current) return;

        const startTime = Date.now();

        intervalRef.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const fill = Math.min((elapsedTime / 2000) * 100, 100);

            setFill(fill);
        }, 10);
    };

    const stopTimeout = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        }
    };

    useEffect(() => {
        if (fill === 100) {
            stopTimeout();

            startTransition(async () => {
                await action();
                setFill(0);
            });
        }
    }, [action, fill]);

    useEffect(() => {
        return () => stopTimeout();
    }, []);

    return [fill, pending, startTimeout, stopTimeout] as const;
};

export { useRemove };