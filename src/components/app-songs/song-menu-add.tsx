"use client";

import { ArrowDownToLineIcon, LoaderCircleIcon } from "lucide-react";
import { type MouseEvent, useRef, useTransition } from "react";

import { addSong } from "@/db/actions";
import { type SongData } from "@/db/types";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useToast } from "../ui/use-toast";

const DropdownMenuAddSong: React.FC<{
    song: SongData;
    isSaved: boolean;
}> = ({ song, isSaved }) => {
    const [pending, startTransition] = useTransition();
    const ref = useRef<HTMLDivElement>(null);

    const { toast } = useToast();

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

export { DropdownMenuAddSong };
