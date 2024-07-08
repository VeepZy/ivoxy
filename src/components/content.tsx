import { getPlaylists } from "@/db/queries";

import { ContentWrapper } from "./content-wrapper";

const Content: React.FC<{ children: React.ReactNode }> = async ({
    children,
}) => {
    const playlists = await getPlaylists();

    return (
        <ContentWrapper playlists={playlists}>{children}</ContentWrapper>
    );
};

export { Content };
