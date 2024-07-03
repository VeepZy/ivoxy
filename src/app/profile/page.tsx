"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { NextPage } from "next";

const ProfileRoute: NextPage = () => {
    return (
        <div>
            <Button onClick={() => auth()}>Token</Button>
        </div>
    );
};

export default ProfileRoute;
