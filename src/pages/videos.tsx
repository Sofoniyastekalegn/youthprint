import React, { useState } from 'react'
import { apiClient } from '../util/axios';
import { extractLastIdFromUrl } from '../app/components/videos'
import { videosinfo } from '@/interface/videos';
import Link from 'next/link';
import { STRAPI_API_URL } from '@/app/components/config';
import youtubeLogo from "../app/assets/youtube.png"
import Image from "next/image";
import ItemList from '@/app/components/ItemList';
import Head from 'next/head';

interface VideosProps {
    videos: videosinfo[];
}

export default function Videos({ videos }: VideosProps) {
    const [visibleItems, setVisibleItems] = useState(4);

    const loadMoreItems = () => {
        setVisibleItems(prev => prev + 2);
    };

    if (!videos || videos.length === 0) {
        return <div>No items available.</div>;
    }
    return (
        <>
        <Head>
        <title>Videos | The Youth Print</title>
      </Head>
        <div className='body-container'>
            <div className="content-banner">
        <h5 className=" mb-4"> Videos </h5>
      </div>
            <div className="pt-2">
                <div id="children_append" className="row row-cols-1 row-cols-md-3 g-4">
                    {videos.slice(0, visibleItems).map((item, index) => (
                        <div className="col-md-12 col-lg-6" key={index}>
                            <Link className="card" href={`video/${item.attributes.slug}`}>
                                <div className="row g-0">
                                    <div className="col-md-5">
                                        <div className="hover-container">
                                            <div className="background"></div>
                                            <Image
                                                className='w-100'
                                                src={"https://img.youtube.com/vi/" + extractLastIdFromUrl(item.attributes.link) + "/maxresdefault.jpg"}
                                                width='580'
                                                height='283'
                                                alt={'IMAGE'}
                                            />
                                            <button
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                }}
                                            >
                                                <Image src={youtubeLogo} alt="Play" width={50} height={50} />
                                            </button>

                                            {/* <Image
                      className='w-100'
                      src={STRAPI_API_URL + item.attributes.headerImage.data.attributes.url}
                      width='1313'
                      height='738'
                      alt="..."
                    /> */}
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-body ps-0 ps-md-4 pt-4 pt-md-0">
                                            <div className="card-text card-date pb-2">{item.attributes.date}</div>
                                            <h6 className="card-subtitle mb-2">{item.attributes.title}</h6>
                                            <p className="card-text mb-3">{item.attributes.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                {visibleItems < videos.length && (
                    <p className="text-center m-3 mt-5">
                        <button className="btn btn-primary btn-round" id="btn_content" onClick={loadMoreItems}>More +</button>
                    </p>
                )}
            </div>
        </div></>
    )
}


export function Videoslist({ videos }: VideosProps) {
    const [visibleItems, setVisibleItems] = useState(4);

    const loadMoreItems = () => {
        setVisibleItems(prev => prev + 2);
    };

    if (!videos || videos.length === 0) {
        return <div>No items available.</div>;
    }
    return (
        <>
        <Head>
        <title>Videos | The Youth Print</title>
      </Head>
        <div className='body-container'>
            <div className="pt-2">
                <div id="children_append" className="row row-cols-1 row-cols-md-3 g-4">
                    {videos.slice(0, visibleItems).map((item, index) => (
                        <div className="col-md-12 col-lg-6" key={index}>
                            <Link className="card" href={`video/${item.attributes.slug}`}>
                                <div className="row g-0">
                                    <div className="col-md-5">
                                        <div className="hover-container">
                                            <div className="background"></div>
                                            <Image
                                                className='w-100'
                                                src={"https://img.youtube.com/vi/" + extractLastIdFromUrl(item.attributes.link) + "/maxresdefault.jpg"}
                                                width='580'
                                                height='283'
                                                alt={'IMAGE'}
                                            />
                                            <button
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                }}
                                            >
                                                <Image src={youtubeLogo} alt="Play" width={50} height={50} />
                                            </button>

                                            {/* <Image
                      className='w-100'
                      src={STRAPI_API_URL + item.attributes.headerImage.data.attributes.url}
                      width='1313'
                      height='738'
                      alt="..."
                    /> */}
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-body ps-0 ps-md-4 pt-4 pt-md-0">
                                            <div className="card-text card-date pb-2">{item.attributes.date}</div>
                                            <h6 className="card-subtitle mb-2">{item.attributes.title}</h6>
                                            <p className="card-text mb-3">{item.attributes.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                {visibleItems < videos.length && (
                    <p className="text-center m-3 mt-5">
                        <button className="btn btn-primary btn-round" id="btn_content" onClick={loadMoreItems}>More +</button>
                    </p>
                )}
            </div>
        </div></>
    )
}






// Use getStaticProps for SSG
export async function getStaticProps() {
    try {
        const videosresponse = await apiClient.get("/api/videos?sort[0]=date:desc&populate=*");

        const videos = videosresponse?.data?.data;

        return {
            props: {

                videos,
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return {
            props: {
                videos: [],
            },
        };
    }
}
