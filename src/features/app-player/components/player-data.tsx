import { UnescapedTitle } from "@/features/unescaped-title/components";
import Image from "next/image";

const AppPlayerData = () => {
    return (
        <div className="hidden md:flex md:items-center md:gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-md border-2 border-foreground drop-shadow-md">
                <Image
                    alt="Song title"
                    className="aspect-square object-cover transition-all hover:scale-105"
                    height={120}
                    src="/thumbnail-placeholder.jpg"
                    width={320}
                />
            </div>
            <div>
                <UnescapedTitle
                    title="Eminem - Love The Way You Lie ft. Rihanna"
                    className="text-sm"
                />
                <p className="text-xs text-muted-foreground">
                    Channel title
                </p>
            </div>
        </div>
    );
};

export { AppPlayerData };
