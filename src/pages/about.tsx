import React from 'react'
import { apiClient } from '../util/axios';
import Head from 'next/head';
import { BlocksContent } from '@strapi/blocks-react-renderer';
import ArticleContent from '@/app/components/articles';

export interface aboutattributes{
    title?: string;
    content?: BlocksContent;
}

export interface about{
    data : aboutattributes;
}

export default function about({data} : about) {
  return (

    
    <>
        <Head>
        <title>About | The Youth Print</title>
      </Head>
        <div className="body-container">


        <div className="row">
            <div className="col-lg-3 order-2 order-sm-2 order-md-2 order-lg-1 order-xl-1">

            </div>

            <div className="col-lg-6 order-1 order-sm-1 order-md-1 order-lg-2 order-xl-2 " id="content_col_2">

                <ArticleContent content={data?.content|| []} title = {data?.title|| ""} />
      
            </div>
            <div className="col-lg-3 order-3 " id="content_col_3">

            </div>

        </div>
    </div>
    </>

  )
}




export async function getStaticProps() {
    try {
      const response = await apiClient.get("/api/about-p?populate=*");
      const data = response?.data?.data.attributes;  
      return {
        props: {
            data,
        },
        revalidate: 10,
      };
    } catch (error) {
      console.error("Error fetching events:", error);
      return {
        props: {
            aboutp: [],
        },
      };
    }
  }