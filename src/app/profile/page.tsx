import { type NextPage } from "next";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/db/queries";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
import { cookies } from "next/headers";
import { AuthButton } from "./auth";
import { SignOut } from "./sign-out";

const ProfileRoute: NextPage = async () => {
    const user = await getUser();
    const cookieStore = cookies();

    const isAuthenticated = !!cookieStore.get("google_access_token");

    return (
        <div className="relative flex h-full flex-col items-center justify-center space-y-4 overflow-hidden p-6">
            <Avatar>
                <AvatarImage
                    sizes="xl"
                    src={user?.user_metadata?.avatar_url ?? ""}
                />
                <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div className="text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                    {user?.user_metadata?.user_name ?? ""}
                </h3>
                <p className="text-muted-foreground">
                    {user?.user_metadata?.name ?? ""}
                </p>
            </div>
            {isAuthenticated ? (
                <p className="text-green-400">Authenticated</p>
            ) : (
                <AuthButton />
            )}

            <SignOut />
        </div>
    );
};

export default ProfileRoute;
