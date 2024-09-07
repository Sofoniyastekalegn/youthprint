import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { apiClient } from '../../util/axios';
import { EventlistProps } from "@/interface/events";
import {STRAPI_API_URL} from "../../app/components/config"
import { Blog, bloglist, BlogPageProps, BlogProps } from '@/interface/blog';
import ItemList from '@/app/components/ItemList';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Head from 'next/head';

export default function Publication({ data }: bloglist) {

  const [visibleEvents, setVisibleEvents] = useState(3);

  const loadMoreEvents = () => {
    setVisibleEvents(prev => prev + 2);
  };

  if (!data || data.length === 0) {
    return <div>No publications available.</div>;
  }

  return (
    <>
    <Head>
        <title>{data[0].attributes.research_tag.data.attributes.tag} | The Youth Print</title>
      </Head>
    <div className="body-container">
      <div className="content-banner">
        <h5 className=" mb-4"> {data[0].attributes.research_tag.data.attributes.tag} </h5>
      </div>

      <ItemList items={data} baseLink="/publication" initialVisibleItems={4} />
    </div></>
  );
}



export const getServerSideProps: GetServerSideProps<bloglist, Params> = async (context: GetServerSidePropsContext<Params>): Promise<GetServerSidePropsResult<bloglist>> => {
    const { slug } = context.params!;
    try {
        const blogResponse = await apiClient.get(`/api/publications?filters[research_tag][slug][$eq]=${encodeURIComponent(slug)}&sort[0]=date:desc&populate=*`);

        if (blogResponse.data.data.length === 0) {
            return { notFound: true };
        }

        const data = blogResponse?.data?.data as Blog[];


        return {
            props: {
                data,
            },
        };
    } catch (error) {
        console.error("Error fetching blog:", error);
        return {
            props: {
                data: null,
            },
            notFound: true,
        };
    }
}
