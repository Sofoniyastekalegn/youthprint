import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { apiClient } from '../util/axios';
import { EventlistProps } from "@/interface/events";
import { NEXT_PUBLIC_API_URL } from "../app/components/config"
import ItemList from '@/app/components/ItemList';
import Head from 'next/head';

export default function Events({ events }: EventlistProps) {


  if (!events || events.length === 0) {
    return <div>No events available.</div>;
  }

  return (
    <>
      <Head>
        <title>Events | The Youth Print</title>
      </Head>
      <div className="body-container">
        <div className="content-banner">
          <h5 className="pt-5 mb-4"> Events </h5>
        </div>
        <Link className="card mt-5" href={`/event-details/${events[0].attributes.slug}`}>
         <div id="children_append" className="row row-cols-1 row-cols-md-3 g-4"></div>
          <div className='col-md-12 col-lg 6'></div>
          <div className="row g-0">
            <div className="col-md-5">
              <div className="hover-container">
                <div className="background"></div>
                <Image
                  className='card-img-top"'
                  src={NEXT_PUBLIC_API_URL + events[0].attributes.headerImage.data.attributes.url}
                  width='1313'
                  height='738'
                  alt="..."
                />
              </div>
            </div>
            <div className="col-md-7">
              <div className="card-body ps-0 ps-0 ps-md-4 pt-4 pt-md-0">
                <div className="card-text card-date pb-2">{events[0]?.attributes.date}</div>
                <h6 className="card-subtitle mb-3">{events[0]?.attributes.title}</h6>
                <p className="card-text mb-3">
                  {events[0].attributes.summary}
                </p>
              </div>
            </div>
          </div>
        </Link>

        <ItemList items={events.slice(1,)} baseLink="/event-details" initialVisibleItems={2} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const response = await apiClient.get("/api/events?sort[0]=date:desc&populate=*");
    const events = response?.data?.data;

    return {
      props: {
        events,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      props: {
        events: [],
      },
    };
  }
}
