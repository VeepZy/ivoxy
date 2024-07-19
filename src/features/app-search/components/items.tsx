"use client";

import { LoaderCircleIcon } from "lucide-react";

import { Song } from "@/components/app-songs/song";
import { Button } from "@/components/ui/button";

import { useSearchStore } from "../stores/search";

const AppSearchItems: React.FC = () => {
    const items = useSearchStore((state) => state.items);
    const loadMore = useSearchStore((state) => state.loadMore);
    const setLoadMore = useSearchStore((state) => state.setLoadMore);

    return (
        <>
            <div className="flex w-full flex-row flex-wrap gap-8">
                {items.map((item) => (
                    <Song key={`${item.url}+${item.title}`} song={item} />
                ))}
            </div>
            {items.length > 0 && (
                <div className="mt-8 flex justify-center">
                    <Button
                        disabled={loadMore}
                        onClick={() => setLoadMore(true)}
                    >
                        {loadMore ? (
                            <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                        ) : (
                            <>Load More</>
                        )}
                    </Button>
                </div>
            )}
        </>
    );
};

export { AppSearchItems };
