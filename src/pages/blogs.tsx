import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { apiClient } from '../util/axios';
import { EventlistProps } from "@/interface/events";
import {NEXT_PUBLIC_API_URL} from "../app/components/config"
import { BlogPageProps } from '@/interface/blog';
import ItemList from '@/app/components/ItemList';

export default function Events({ allBlogs, pinnedBlogs }: BlogPageProps) {

  const [visibleEvents, setVisibleEvents] = useState(3);

  const loadMoreEvents = () => {
    setVisibleEvents(prev => prev + 2);
  };

  if (!allBlogs || allBlogs.length === 0) {
    return <div>No events available.</div>;
  }

  return (
    <div className="body-container">
      <div className="content-banner">
        <h5 className=" mb-4"> Blogs </h5>
      </div>
      {pinnedBlogs && pinnedBlogs.length > 0 && (
        <div className="pinned-blogs">
          <h5>pinned-Blogs</h5>
          <ItemList items={pinnedBlogs} baselink="/blog" initialVisibleItems={4} />
          </div>
          
      )}


      <ItemList items={allBlogs} baseLink="/blog" initialVisibleItems={4} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await apiClient.get("/api/blogs?sort[0]=date:desc&populate=*");

    const allBlogs = response?.data?.data;
    const pinnedBlogsResponse = await apiClient.get("/api/blogs?pinned=true&populate=*");


    const pinnedBlogs = response?.data?.data;
    
    return {
      props: {
        allBlogs, pinnedBlogs
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      props: {
        allBlogs: [],
        pinnedBlogs: [],
      },
    };
  }
}
