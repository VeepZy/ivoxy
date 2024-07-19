"use client";

import { ArrowDownToLineIcon } from "lucide-react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addSong } from "@/db/actions";
import { useDataStore } from "@/hooks/use-data";
import { usePlayerStore } from "@/stores/player";
import { isSavedSong } from "@/utils/filter";

const AppPlayerSave = () => {
    const [pending, startTransition] = useTransition();

    const data = usePlayerStore((store) => store.data);
    const index = usePlayerStore((store) => store.currentIndex);

    const { toast } = useToast();
    const { songs } = useDataStore();

    const isSaved = data ? isSavedSong(songs, data[index].url) : false;

    const onSave = () =>
        startTransition(async () => {
            if (!data) {
                return;
            }

            await addSong(data[index]);

            toast({
                title: "Success",
                description: `${data[index].title} has been saved.`,
            });
        });

    return (
        <Button
            className="flex-shrink-0"
            disabled={pending || isSaved}
            size="icon"
            variant="outline"
            onClick={onSave}
        >
            <ArrowDownToLineIcon className="h-5 w-5" />
        </Button>
    );
};

export { AppPlayerSave };
