import { type Playlist } from "@/db/types";

import { Links } from "../data/links";

import { SidebarLink } from "./sidebar-link";

const Sidebar: React.FC<{ playlists: Playlist[] }> = ({ playlists }) => {
    return (
        <div className="hidden pb-20 lg:block">
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Discover
                    </h2>
                    <div className="space-y-1">
                        <SidebarLink link={Links().listenNow} />
                        <SidebarLink link={Links().browse} />
                        <SidebarLink link={Links().radio} />
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Library
                    </h2>
                    <div className="space-y-1">
                        <SidebarLink link={Links().playlists} />
                        <SidebarLink link={Links().songs} />
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Playlists
                    </h2>

                    <div className="space-y-1 p-2">
                        {playlists.map((playlist) => (
                            <SidebarLink
                                key={playlist.id}
                                link={Links(playlist).playlist}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Sidebar };
