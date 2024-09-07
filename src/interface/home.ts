import { Blog, bloginfo } from "./blog";
import {mediainfo} from "../interface/media"
import {videosinfo, videosdata} from "./videos"


export interface HomeAttributes {
    headertext: string;
    headervid: mediainfo;
    pinnedPublication : bloginfo;
    current_works : videosdata;
}

export interface HomeProps {
    weblog: HomeAttributes;
    blogs : Blog[];
    videos : videosinfo[];
    researchTags: Tags[];
    matchingBlogIndex: number;
}

export interface tagsList{
    data: Tags[]
}

export interface tagsSingle{
    data: Tags
}

export interface Tags{
    id: number;
    attributes: TagAttributes;
}

export interface TagAttributes{
    tag : string;
    slug: string;
}


