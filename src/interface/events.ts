import {mediainfo} from "../interface/media"
import { topicprops } from "./topictags";

export interface EventProps {
    event : Event | null;
    /* event: Event; */
    relatedEvents : Event[];
}

export interface EventlistProps {
    events: Event[];
    index : number;
}

export interface Event {
    id: number;
    attributes: EventAttributes;
}

export interface EventAttributes {
    title: string;
    summary: string;
    venue : string;
    date: string;
    headerImage: mediainfo;
    content : []
    topic_tags : topicprops;
    enquiry: string;
    slug: string;
    startTime: string;
    endTime: string;
    participants : participants[];
}

export interface participants{
    id: string | "";
    name: string;
    email: string;
    phone: string;
    organisation:string;
}

