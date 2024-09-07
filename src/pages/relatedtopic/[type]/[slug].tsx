import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { apiClient } from '../../../util/axios';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import ItemList from '@/app/components/ItemList';
import Head from 'next/head';
import { Blog, bloglist } from '@/interface/blog';
import { Staff, staffinfos } from '@/interface/staff';
import { Infographic } from '@/interface/infographics';
import { videosinfo } from '@/interface/videos';
import { Topic } from '@/interface/topictags';
import Infographics, { InfographicsList } from '@/pages/infographics';
import Videos, { Videoslist } from '@/pages/videos';

export interface TopicContentProps {
  data: Blog[] | Event[] | Infographic[] | videosinfo[] | null;
  topic: Topic[] | null;
  contentType: 'publication' | 'events' | 'infographics' | 'videos';
}

export default function RelatedTopic({ data, topic, contentType }: TopicContentProps) {
 let datatype : any[]= []; 


  if(contentType=='publication'){
    datatype = data as Blog[];
  }else if (contentType=='events'){
    datatype = data as Event[];
  }else if (contentType=='infographics'){
    datatype = data as Infographic[];
  }else if (contentType=='videos'){
    datatype = data as videosinfo[];
  }

  
  console.log(data)
  return (
    <div className="body-container">
      <div className="content-banner">
        <h5 className=" mb-4">{topic && topic.length > 0 ? topic[0].attributes.title : 'Unknown'}</h5>
      </div>
      {contentType == 'publication' &&
        (<ItemList items={datatype} baseLink="/publication" initialVisibleItems={4} />)}

      {contentType == 'events' &&
        (<ItemList items={datatype} baseLink="/event-details" initialVisibleItems={4} />)}

      {contentType == 'infographics' &&
        (<InfographicsList research={datatype}></InfographicsList>)}

      {contentType == 'videos' &&
        (<Videoslist videos={datatype}></Videoslist>)}



    </div>
  )
}


export const getServerSideProps: GetServerSideProps<TopicContentProps, Params> = async (context: GetServerSidePropsContext<Params>): Promise<GetServerSidePropsResult<TopicContentProps>> => {
  const { slug, type } = context.params!;

  const contentTypeMap: { [key: string]: string } = {
    publications: 'publications',
    events: 'events',
    infographics: 'infographics',
    videos: 'videos',
  };

  const contentType = contentTypeMap[type] || 'publications';

  try {
    const contentResponse = await apiClient.get(`/api/${contentType}?filters[topic_tags][slug][$contains]=${encodeURIComponent(slug)}&sort[0]=date:desc&populate=*`);
    const topicResponse = await apiClient.get(`/api/topic-tags?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);

    if (contentResponse.data.data.length === 0) {
      return { notFound: true };
    }

    const data = contentResponse?.data?.data as Blog[] | Event[] | Infographic[] | videosinfo[];
    const topic = topicResponse?.data?.data as Topic[];


    return {
      props: {
        topic,
        data,
        contentType: type,
      },
    };
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return {
      props: {
        topic: null,
        data: null,
        contentType: type,
      },
      notFound: true,
    };
  }
}
