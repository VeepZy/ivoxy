import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
    PlayIcon,
    Repeat2Icon,
    ShuffleIcon,
    SkipBackIcon,
    SkipForwardIcon,
    Volume2Icon,
} from "lucide-react";

const AppPlayerControls: React.FC = () => {
    return (
        <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="flex-shrink-0">
                <SkipBackIcon className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="flex-shrink-0">
                <PlayIcon className="h-6 w-6" />
            </Button>
            <Button size="icon" variant="ghost" className="flex-shrink-0">
                <SkipForwardIcon className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="flex-shrink-0">
                <Repeat2Icon className="h-6 w-6" />
            </Button>
            <Button size="icon" variant="ghost" className="flex-shrink-0">
                <ShuffleIcon className="h-6 w-6" />
            </Button>
            <Slider
                className="min-w-[120px]"
                defaultValue={[0]}
                min={0}
                max={1}
                step={0.05}
            />
            <Button size="icon" variant="ghost" className="flex-shrink-0">
                <Volume2Icon className="h-6 w-6" />
            </Button>
        </div>
    );
};

export { AppPlayerControls };
