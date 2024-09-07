import { bloglist } from "./blog";
import { EventlistProps } from "./events";
import { infographicprops } from "./infographics";
import { videosdata } from "./videos";




export interface topicprops {
    data: Topic[];
}

export interface Topic {
    attributes: topicattributes;
}

export interface topicattributes {
    title: string;
    slug: string;
    infographics: infographicprops;
    events:EventlistProps;
    publications: bloglist;
    videos : videosdata;

}