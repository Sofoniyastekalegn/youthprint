

export interface mediainfo {
    data : mediadata;
}

export interface mediadata {
    id :number;
    attributes : MediaAttributes;
}

export interface MediaAttributes {
    url : string
    width : number;
    height : number;
    alternativeText : string;
}
