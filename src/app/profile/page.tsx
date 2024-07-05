"use client";

import { type NextPage } from "next";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

const ProfileRoute: NextPage = () => {
    return (
        <div>
            <Button onClick={() => auth()}>Token</Button>
        </div>
    );
};

export default ProfileRoute;
