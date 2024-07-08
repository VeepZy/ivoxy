import { getPlaylists, getSongs } from "@/db/queries";
import { VideoPlayer } from "./player";

const PlayerWrapper: React.FC = async () => {
    const [playlists, songs] = await Promise.all([
        getPlaylists(),
        getSongs(),
    ]);

    return <VideoPlayer playlists={playlists} songs={songs} />;
};

export { PlayerWrapper };
