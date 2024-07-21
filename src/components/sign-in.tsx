"use client";

import { authSignIn } from "@/db/actions";
import { useMounted } from "@/hooks/mounted";

import { Button } from "./ui/button";

const SignIn: React.FC = () => {
    const mounted = useMounted();

    if (!mounted) {
        return null;
    }

    return (
        <Button onClick={() => authSignIn(window.location.origin)}>
            Sign in
        </Button>
    );
};

export { SignIn };
