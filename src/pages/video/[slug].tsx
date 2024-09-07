import DevelopmentPartners from '@/app/components/partners'
import React from 'react'
import { apiClient } from '../../util/axios';
import { VideoProps, videosinfo } from '@/interface/videos';
import Videos from '@/app/components/videos';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { EventProps } from '@/interface/events';
import Head from 'next/head';
import Link from 'next/link';

interface Params extends ParsedUrlQuery {
    slug: string;
}


export default function video({ videos }: VideoProps) {

    function extractLastIdFromUrl(url: string) {
        const parts = url.split('=');
        return parts[parts.length - 1];
    }
    return (
        <>
            <Head>
                <title>{videos?.attributes.title}| The Youth Print</title>
            </Head>
            <div className="body-container">

                <div className="container-full">

                    <div className="row">

                        <div className="col-lg-3 order-2 order-sm-2 order-md-2 order-lg-1 order-xl-1">
                            <div className="mt-5 stick-container">

                            </div>
                        </div>
                        <div className="col-lg-6 order-1 order-sm-1 order-md-1 order-lg-2 order-xl-2 ">
                            <article className="m-4 mt-5">

                                <h3 className="mb-4">
                                    {videos?.attributes.title}
                                </h3>
                                <h4 className="mb-4">

                                    {videos?.attributes.description}

                                </h4>
                                <p className="mb-4">
                                    Published on {videos?.attributes.date}

                                </p>
                                <iframe width="853" height="480" src={"https://www.youtube.com/embed/" + extractLastIdFromUrl(videos?.attributes.link || "")}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </article>

                        </div>
                        <div className='col-lg-3 order-3'>
                            <div className='mt-5'></div>
                        </div>
                    </div>

                    <DevelopmentPartners />

                    <div className="container-full pt-5">
                        <div className="heading">
                            <h6>Related content</h6>
                        </div>
                        <div className="mb-4">
                            {videos?.attributes.topic_tags.data.map((tag, index) => (
                                <Link key={index} className="btn btn-success btn-sm me-2 mb-3" href={`/relatedtopic/${'videos'}/${encodeURIComponent(tag.attributes.slug)}`}>
                                    {tag.attributes.title}
                                </Link>
                            ))}
                        </div>
                        <Videos Videos={videos?.attributes.relatedvid || null} />
                    </div>

                </div>
            </div></>
    )
}

export const getServerSideProps: GetServerSideProps<VideoProps, Params> = async (context: GetServerSidePropsContext<Params>): Promise<GetServerSidePropsResult<VideoProps>> => {
    const { slug } = context.params!;
    try {
        const response = await apiClient.get(`/api/videos?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);

        if (response.data.data.length === 0) {
            return { notFound: true };
        }

        const videos = response.data.data[0] as videosinfo;

        return {
            props: {
                videos,
            },
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return {
            props: {

                videos: null,

            },
            notFound: true,
        };
    }
}



