import DevelopmentPartners from '@/app/components/partners'
import React, { useState, useEffect, useRef } from 'react'
import Image from "next/image";
import { apiClient } from '../../util/axios';
import { VideoProps, videosinfo } from '@/interface/videos';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Research, ResearchProps } from '../../interface/research';
import Link from 'next/link';
import Related from '@/app/components/related';
import { NEXT_PUBLIC_API_URL } from "../../app/components/config"
import { Infographic, InfographicProps } from '@/interface/infographics';
import Head from 'next/head';
import { info } from 'console';


interface Params extends ParsedUrlQuery {
    slug: string;
}

export default function Infographics({ infographic, allInfographics }: InfographicProps) {


    const relatedInfographicIds = infographic?.attributes.relatedinfographic.data.map(ri => ri.id) || [];
    const relatedInfographics = allInfographics.filter(infographic => relatedInfographicIds.includes(infographic.id));

    return (
        <>
            <Head>
                <title>{infographic?.attributes.title} | The Youth Print</title>
            </Head>
            <div className="body-container">
                <div className="container-full">
                    <div className="row">
                        <div className="col-lg-3 order-2 order-sm-2 order-md-2 order-lg-1 order-xl-1">
                            <div className="mt-5 stick-container"></div>
                        </div>
                        <div className="col-lg-6 order-1 order-sm-1 order-md-1 order-lg-2 order-xl-2">
                            <article className="m-4 mt-5">
                                <h3 className="mb-4">{infographic?.attributes.title}</h3>
                                <h4 className="mb-4">{infographic?.attributes.summary}</h4>
                                <p className="mb-4">Published on {infographic?.attributes.date}</p>
                                <Image
                                    className="cars-img-top"
                                    src={infographic?.attributes?.infographics?.data?.attributes?.url ? `${NEXT_PUBLIC_API_URL}${infographic.attributes.infographics.data.attributes.url}` : '/path/to/placeholder-image.jpg'}
                                    width={infographic?.attributes?.infographics?.data?.attributes?.width || '1301'}
                                    height={infographic?.attributes?.infographics?.data?.attributes?.height || '1301'}
                                    alt="..."
                                />

                            </article>
                        </div>
                        <div className='col-lg-3 order-3'>
                            <div className='mt-5'></div>
                        </div>
                    </div>
                    <DevelopmentPartners />
                    <div className="container-full pt-5">
                        <div className="heading mb-1">
                            <h6>Related content</h6>
                        </div>
                        <div className="mb-4">
                            {infographic?.attributes.topic_tags.data.map((tag, index) => (
                                <Link key={index} className="btn btn-success btn-sm me-2 mb-3" href={`/relatedtopic/${'infographics'}/${encodeURIComponent(tag.attributes.slug)}`}>
                                    {tag.attributes.title}
                                </Link>
                            ))}
                        </div>
                        <Related infographics={relatedInfographics} NEXT_PUBLIC_API_URL={NEXT_PUBLIC_API_URL || ''} />
                    </div>
                </div>
            </div></>
    )
}

export const getServerSideProps: GetServerSideProps<InfographicProps, Params> = async (context: GetServerSidePropsContext<Params>): Promise<GetServerSidePropsResult<InfographicProps>> => {
    const { slug } = context.params!;
    try {
        const response = await apiClient.get(`/api/infographics?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
        if (response.data.data.length === 0) {
            return { notFound: true };
        }
        const infographic = response.data.data[0] as Infographic;

        const allResearchResponse = await apiClient.get(`/api/infographics?populate=*`);
        const allInfographics = allResearchResponse.data.data as Infographic[];

        return {
            props: {
                infographic,
                allInfographics,
            },
        };
    } catch (error) {
        console.error("Error fetching research:", error);
        return {
            props: {
                infographic: null,
                allInfographics: [],
            },
            notFound: true,
        };
    }
}
