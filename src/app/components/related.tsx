import { Blog } from "@/interface/blog";
import { Event } from "@/interface/events";
import { Infographic } from "@/interface/infographics";
import { Research } from "@/interface/research";
import Image from "next/image";
import Link from "next/link";

interface ListProps {
    blogs?: Blog[];
    events?: Event[];
    infographics?: Infographic[];
    NEXT_PUBLIC_API_URL: string;
}

// Type Guards
const isBlog = (item: any): item is Blog => 'headerImage' in item.attributes;
const isEvent = (item: any): item is Event => 'headerImage' in item.attributes;
const isResearch = (item: any): item is Research => 'infographics' in item.attributes;

const Related = ({ blogs, events, infographics, NEXT_PUBLIC_API_URL }: ListProps) => {
    // Determine the type of content
    const isBlogContent = !!blogs;
    const isEventContent = !!events;
    const items = isBlogContent ? blogs : isEventContent ? events : infographics;
    const linkPrefix = isBlogContent ? '/publication/' : isEventContent ? '/event-details/' : '/infographics/';

    // Ensure items are available
    if (!items) return null;

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {items.map((item, index) => (
                <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                    <Link className="card h-100" href={`${linkPrefix}${item.attributes.slug}`}>
                        <div className="hover-container">
                            <div className="background"></div>
                            {isBlog(item) || isEvent(item) ? (
                                <Image
                                    className="card-img-top"
                                    src={item?.attributes?.headerImage?.data?.attributes?.url ? `${NEXT_PUBLIC_API_URL}${item.attributes.headerImage.data.attributes.url}` : '/path/to/placeholder-image.jpg'}
                                    width={item?.attributes?.headerImage?.data?.attributes?.width || 600}
                                    height={item?.attributes?.headerImage?.data?.attributes?.height || 400}
                                    alt={item?.attributes?.headerImage?.data?.attributes?.alternativeText || 'Default Alt Text'}
                                />

                            ) : isResearch(item) ? (
                                <Image
                                    className="card-img-top"
                                    src={item?.attributes?.infographics?.data?.attributes?.url ? `${NEXT_PUBLIC_API_URL}${item.attributes.infographics.data.attributes.url}` : '/path/to/placeholder-image.jpg'}
                                    width={item?.attributes?.infographics?.data?.attributes?.width || 600}
                                    height={item?.attributes?.infographics?.data?.attributes?.height || 400}
                                    alt={item?.attributes?.infographics?.data?.attributes?.alternativeText || 'Default Alt Text'}
                                />

                            ) : null}
                        </div>
                        <div className="card-body ps-2 pe-2 pt-2">
                            <h6 className="card-related-title mb-4">{item.attributes.title}</h6>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Related;
