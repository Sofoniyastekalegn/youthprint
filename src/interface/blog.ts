import exp from "constants";
import {mediainfo} from "../interface/media"
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Tags, tagsList, tagsSingle } from "./home";
import { stafflist } from "./staff";
import { topicprops } from "./topictags";

export interface BlogAttributes {
    title: string;
    authors : stafflist;
    summary: string;
    date: string;
    headerImage: mediainfo;
    content : BlocksContent;
    topic_tags : topicprops;
    slug : string;
    relatedpublications: bloglist;
    research_tag: tagsSingle;
    fileLink: string;
}
export interface Blog {
    id: number;
    attributes: BlogAttributes;
}
export interface bloginfo {
    data: Blog;
}

export interface bloglist {
    data: Blog[]| null;
}

export interface BlogProps {
    blog: Blog | null; 
    allBlogs: Blog[];
}

export interface BlogPageProps extends BlogProps {
    allBlogs: Blog[];
}
