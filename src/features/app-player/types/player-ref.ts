import { ComponentType, RefObject } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";

export type PlayerRef = RefObject<
    ComponentType<ReactPlayerProps> & ReactPlayer
>;
export type Player = ComponentType<ReactPlayerProps> & ReactPlayer;
