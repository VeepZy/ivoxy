"use client";

import { MoreVerticalIcon } from "lucide-react";
import { useTransition } from "react";

import { type Song } from "@/db/types";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import { removeSong } from "./actions/remove";

const SongMoreButton: React.FC<{ song: Song }> = ({ song }) => {
    const [pending, startTransition] = useTransition();

    const onRemove = () => {
        startTransition(async () => {
            await removeSong(song);
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVerticalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    disabled={pending}
                    onClick={() => onRemove()}
                    className="text-destructive"
                >
                    Remove
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { SongMoreButton };
