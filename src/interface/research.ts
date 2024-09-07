import exp from "constants";
import {mediainfo} from "../interface/media"

export interface researchlist {
    research: Research[];
}

export interface researchprops {
    data: Research[];
}

export interface Research {
    id: number;
    attributes: ResearchAttributes;
}

export interface ResearchAttributes {
    title: string;
    summary: string;
    date: string;
    infographics: mediainfo;
    tags : string[];
    slug : string;
    relatedresearch: researchprops;
    /* relatedblogs: bloglist; */
}


export interface ResearchProps {
    research: Research| null ;
    allResearches: Research[];
}