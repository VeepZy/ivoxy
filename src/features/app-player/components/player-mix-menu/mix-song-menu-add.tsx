"use client";

import { ArrowDownToLineIcon, LoaderCircleIcon } from "lucide-react";
import { type MouseEvent, useRef, useTransition } from "react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { addSong } from "@/db/actions";
import { type SongData } from "@/db/types";
import { useDataStore } from "@/hooks/use-data";
import { isSavedSong } from "@/utils/filter";

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
            className="hover:cursor-pointer hover:bg-secondary"
            disabled={isSaved || pending}
            onClick={handleSave}
        >
            <ArrowDownToLineIcon className="mr-2 h-5 w-5" />
            {isSaved ? "Already saved" : "Save Song"}
            {pending ? <LoaderCircleIcon className="ml-auto h-5 w-5 animate-spin text-primary" /> : null}
        </DropdownMenuItem>
    );
};

export { AppPlayerMixSongMenuAddSong };
