import Menu from "@/features/menu/components/menu";
import Sidebar from "@/features/sidebar/components/sidebar";
import { type NextPage } from "next";

const HomeRoute: NextPage = () => {
    return (
        <>
            <div className="hidden md:block">
                <Menu />
                <div className="border-t">
                    <div className="bg-background">
                        <div className="grid lg:grid-cols-5">
                            <Sidebar />
                            <div className="col-span-3 lg:col-span-4 lg:border-l">
                                <div className="h-full px-4 py-6 lg:px-8"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeRoute;
