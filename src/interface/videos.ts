import { mediainfo } from "./media";
import { topicprops } from "./topictags";


export interface videosdata{
    data: videosinfo[]
}

export interface videosinfo {
    id: number;
    attributes: videosAttributes;
}



export interface videosAttributes {
    title: string;
    description: string;
    date: string;
    link: string;
    cover: mediainfo;
    slug:string;
    relatedvid:videosdata;
    topic_tags : topicprops;
}


export interface VideoProps {
    videos: videosinfo| null ;
}