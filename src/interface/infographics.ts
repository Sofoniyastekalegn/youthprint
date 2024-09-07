import exp from "constants";
import {mediainfo} from "../interface/media"
import { topicprops } from "./topictags";

export interface infographiclist {
    research: Infographic[];
}

export interface infographicprops {
    data: Infographic[];
}

export interface Infographic {
    id: number;
    attributes: InfographicAttributes;
}

export interface InfographicAttributes {
    title: string;
    summary: string;
    date: string;
    infographics: mediainfo;
    topic_tags : topicprops;
    slug : string;
    relatedinfographic: infographicprops;
}


export interface InfographicProps {
    infographic: Infographic| null ;
    allInfographics: Infographic[];
}