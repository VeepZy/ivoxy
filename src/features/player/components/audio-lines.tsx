import { forwardRef } from "react";

export const AudioLines = forwardRef<
    SVGSVGElement,
    React.HTMLAttributes<SVGSVGElement>
>(({ ...props }, ref) => (
    <svg
        ref={ref}
        version="1.1"
        viewBox="0 0 10 8"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g
            fillRule="evenodd"
            id="Audio"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1"
            transform="translate(0.000000, 0.500000)"
        >
            <line id="Line-5" x1="8.5" x2="8.5" y1="0.493135" y2="6.50687">
                <animate
                    attributeName="y1"
                    attributeType="XML"
                    dur=".8s"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="2;0;2"
                />
                <animate
                    attributeName="y2"
                    attributeType="XML"
                    dur=".8s"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="5;7;5"
                />
            </line>
            <line id="Line-4" x1="6.5" x2="6.5" y1="0.789016" y2="6.21098">
                <animate
                    attributeName="y1"
                    attributeType="XML"
                    dur=".5s"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="0;2;0"
                />
                <animate
                    attributeName="y2"
                    attributeType="XML"
                    dur=".5s"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="7;5;7"
                />
            </line>
            <line id="Line-3" x1="4.5" x2="4.5" y1="1.67582" y2="5.32418">
                <animate
                    attributeName="y1"
                    attributeType="XML"
                    dur=".6s"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="1;3;1"
                />
                <animate
                    attributeName="y2"
                    attributeType="XML"
                    dur=".6s"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="6;4;6"
                />
            </line>
            <line id="Line-2" x1="2.5" x2="2.5" y1="1.14678" y2="5.85322">
                <animate
                    attributeName="y1"
                    attributeType="XML"
                    dur=".7s"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="2;1;2"
                />
                <animate
                    attributeName="y2"
                    attributeType="XML"
                    dur=".7s"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="5;6;5"
                />
            </line>
            <line id="Line-1" x1="0.5" x2="0.5" y1="1.67582" y2="5.32418">
                <animate
                    attributeName="y1"
                    attributeType="XML"
                    dur=".9s"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="3;0;3"
                />
                <animate
                    attributeName="y2"
                    attributeType="XML"
                    dur=".9s"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="4;7;4"
                />
            </line>
        </g>
    </svg>
));

AudioLines.displayName = "AudioLines";
