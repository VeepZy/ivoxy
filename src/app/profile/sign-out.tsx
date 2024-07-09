"use client";

import { useRouter } from "next/navigation";

import { createBrowserDBClient } from "@/db/browser";
import { Button } from "@/components/ui/button";

const SignOut: React.FC = () => {
    const router = useRouter();

    const logout = async () => {
        const db = createBrowserDBClient();

        const {
            data: { user },
        } = await db.auth.getUser();

        if (user) {
            await db.auth.signOut();
            router.push("/");
            router.refresh();
        }
    };

    return (
        <Button
            className="absolute right-4 top-2"
            onClick={() => logout()}
        >
            Sign Out
        </Button>
    );
};

export { SignOut };
