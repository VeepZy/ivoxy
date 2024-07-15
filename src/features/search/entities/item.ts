import { SongData } from "@/db/types";
import { type youtube_v3 as Youtube } from "googleapis";

const mapToItem: (data: Youtube.Schema$SearchResult) => SongData = (
    data,
) => {
    return {
        id: data.id?.videoId ?? "",
        title: data.snippet?.title ?? "",
        channelTitle: data.snippet?.channelTitle ?? "",
        thumbnail: data.snippet?.thumbnails?.medium?.url ?? "",
        url: `https://www.youtube.com/embed/${data.id?.videoId ?? ""}`,
    };
};

export { mapToItem };
