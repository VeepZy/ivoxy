import { NextRequest } from "next/server";
import { updateSession } from "./db";

export const middleware = async (request: NextRequest) => {
    return await updateSession(request);
};

export const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)",
        "/",
        "/((?!.*next\\/image\\/.*).*)",
    ],
};
