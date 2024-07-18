"use client";

import { authSignIn } from "@/db/actions";
import { Button } from "./ui/button";

const SignIn: React.FC = () => {
    return <Button onClick={authSignIn}>Sign in</Button>;
};

export { SignIn };
