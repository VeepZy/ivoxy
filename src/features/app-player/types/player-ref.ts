import { type ComponentType, type RefObject } from "react";
import {type ReactPlayerProps} from "react-player";
import type ReactPlayer from "react-player";

export type PlayerRef = RefObject<
    ComponentType<ReactPlayerProps> & ReactPlayer
>;
export type Player = ComponentType<ReactPlayerProps> & ReactPlayer;
