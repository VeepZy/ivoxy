import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDuration = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
};

export const generateRandomNumber: (
    last: number,
    max: number,
) => number = (last, max) => {
    const random = Math.floor(Math.random() * max);

    if (random === last) {
        return generateRandomNumber(last, max);
    }

    return random;
};
