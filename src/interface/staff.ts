import { bloginfo } from "./blog";
import { mediainfo } from "./media";


export interface stafflist {
    leaders: Staff[]| null;
    members: Staff[]| null;
    data: Staff[]| null;
}

export interface staffinfos {
    data: Staff| null;
}

export interface Staff{
    id: number;
    attributes: StaffAttributes;
}

export interface StaffAttributes{
    name: string;
    email: string;
    position : string;
    description: string;
    slug: string;
    publications : bloginfo;
    picture: mediainfo;
    linkdeln : string;
    twitter : string;
    role: string;
}