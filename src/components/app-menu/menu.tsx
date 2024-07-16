import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";


import { MenubarMenuAccount } from "./menu-account";
import { DialogContentCreatePlaylist } from "./menu-create-playlist";
import { MenubarToggleFullscreen } from "./toggle-fullscreen";
import { MenubarSidebarToggle } from "./toggle-sidebar";
import { MenubarThemeToggle } from "./toggle-theme";

const AppMenu: React.FC = () => {
    return (
        <Dialog>
            <Menubar className="rounded-none border-none px-2 lg:px-4">
                <MenubarMenu>
                    <MenubarTrigger className="font-bold">
                        Ivoxy
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>About Ivoxy</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Preferences</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Quit</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="relative">
                        File
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarSub>
                            <MenubarSubTrigger>New</MenubarSubTrigger>
                            <MenubarSubContent className="w-[230px]">
                                <DialogTrigger asChild>
                                    <MenubarItem>Playlist</MenubarItem>
                                </DialogTrigger>
                            </MenubarSubContent>
                        </MenubarSub>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                    <MenubarContent>
                        <MenubarToggleFullscreen />
                        <MenubarSidebarToggle />
                        <MenubarThemeToggle />
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenuAccount />
            </Menubar>
            <DialogContentCreatePlaylist />
            {/* <CreatePlaylist playlists={playlists} /> */}
        </Dialog>
    );
};

export { AppMenu };
