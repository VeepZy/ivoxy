"use client";

import { authSignIn } from "@/db/actions";

import { Button } from "./ui/button";
import { useMounted } from "@/hooks/mounted";

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
