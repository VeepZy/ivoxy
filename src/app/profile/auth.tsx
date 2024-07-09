"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

const AuthButton: React.FC = () => {
    return (
        <Button onClick={() => auth()}>Authenticate with Google</Button>
    );
};

export { AuthButton };
