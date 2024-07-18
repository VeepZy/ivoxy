"use client";

import { SongData } from "@/db/types";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ArrowDownToLineIcon, LoaderCircleIcon } from "lucide-react";
import { useRef, useTransition, MouseEvent } from "react";
import { addSong } from "@/db/actions";
import { useToast } from "@/components/ui/use-toast";
import { isSavedSong } from "@/utils/filter";
import { useDataStore } from "@/hooks/use-data";

const AppPlayerMixSongMenuAddSong: React.FC<{
    song: SongData;
}> = ({ song }) => {
    const [pending, startTransition] = useTransition();
    const ref = useRef<HTMLDivElement>(null);

    const { toast } = useToast();
    const { songs } = useDataStore();

    const isSaved = isSavedSong(songs, song.url);

    const handleSave = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        startTransition(async () => {
            await addSong(song);

            toast({
                title: "Success",
                description: `${song.title} has been saved.`,
            });
        });
    };

    return (
        <DropdownMenuItem
            ref={ref}
            disabled={isSaved || pending}
            className="hover:cursor-pointer hover:bg-secondary"
            onClick={handleSave}
        >
            <ArrowDownToLineIcon className="mr-2 h-5 w-5" />
            {isSaved ? "Already saved" : "Save Song"}
            {pending && (
                <LoaderCircleIcon className="ml-auto h-5 w-5 animate-spin text-primary" />
            )}
        </DropdownMenuItem>
    );
};

export { AppPlayerMixSongMenuAddSong };
