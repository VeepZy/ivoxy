"use client";

import { SongData } from "@/db/types";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { ArrowDownToLineIcon, LoaderCircleIcon } from "lucide-react";
import { useRef, useTransition, MouseEvent } from "react";
import { addSong } from "@/db/actions";
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

export { DropdownMenuAddSong };
