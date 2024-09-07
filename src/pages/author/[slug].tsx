import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React, { useState } from 'react'
import { apiClient } from '../../util/axios';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { Blog, bloglist } from '@/interface/blog';
import ItemList from '@/app/components/ItemList';
import { Staff, staffinfos } from '@/interface/staff';
import Head from 'next/head';

export interface authorinfo {
  data: Blog[] | null;
  author: Staff[] | null;
}

export default function Author({ data, author }: authorinfo) {

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
        <title>{author? author[0].attributes?.name: "Uknown"} | The Youth Print</title>
      </Head>
      <div className="body-container">
        <div className="content-banner">
          <h5 className=" mb-4"> By {author && author.length > 0 ? author[0].attributes?.name : 'Unknown'}</h5>
        </div>

        <ItemList items={data} baseLink="/publication" initialVisibleItems={4} />
      </div></>
  );
}


export const getServerSideProps: GetServerSideProps<authorinfo, Params> = async (context: GetServerSidePropsContext<Params>): Promise<GetServerSidePropsResult<authorinfo>> => {
  const { slug } = context.params!;
  try {
    const blogResponse = await apiClient.get(`/api/publications?filters[authors][slug][$contains]=${encodeURIComponent(slug)}&sort[0]=date:desc&populate=*`);
    const authorResponse = await apiClient.get(`/api/staffs?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
    if (blogResponse.data.data.length === 0) {
      return { notFound: true };
    }

    const data = blogResponse?.data?.data as Blog[];
    const author = authorResponse?.data?.data as Staff[];


    return {
      props: {
        author,
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      props: {
        author: null,
        data: null,
      },
      notFound: true,
    };
  }
}

