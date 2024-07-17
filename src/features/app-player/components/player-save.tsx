import { Button } from "@/components/ui/button";
import { ArrowDownToLineIcon } from "lucide-react";

const AppPlayerSave = () => {
    return (
        <Button size="icon" variant="outline" className="flex-shrink-0">
            <ArrowDownToLineIcon className="h-5 w-5" />
        </Button>
    );
};

export { AppPlayerSave };
