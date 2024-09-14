import React, { useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { apiClient } from '../util/axios';
import { researchlist } from '@/interface/research';
import { NEXT_PUBLIC_API_URL } from "../app/components/config"
import Head from 'next/head';

export default function Infographics({ research }: researchlist) {
  const [visibleEvents, setVisibleEvents] = useState(4);

  const loadMoreEvents = () => {
    setVisibleEvents(prev => prev + 2);
  };

  return (
    <>
      <Head>
        <title>Infographics | The Youth Print</title>
      </Head>
      <div className="body-container">
        <div className="content-banner">
          <h5 className=" mb-4"> Infographics </h5>
        </div>
        <div className="">
          <div id="children_append" className="row row-cols-1 row-cols-md-3 g-4">
            {research.slice(0, visibleEvents).map((reasearchItem, index) => {
              // Calculate the correct index
              const eventIndex = index + 1;
              return (
                <div className="col-md-12 col-lg-6" key={index}>
                  <Link className="card" href={`/infographics/${reasearchItem.attributes.slug}`}>
                    <div className="row g-0">
                      <div className="col-md-5">
                        <div className="hover-container">
                          <div className="background"></div>
                          <Image
                            className="cars-img-top"
                            src={reasearchItem?.attributes?.infographics?.data?.attributes?.url ? `${NEXT_PUBLIC_API_URL}${reasearchItem.attributes.infographics.data.attributes.url}` : '/path/to/placeholder-image.jpg'}
                            width={reasearchItem?.attributes?.infographics?.data?.attributes?.width || 600}
                            height={reasearchItem?.attributes?.infographics?.data?.attributes?.height || 400}
                            alt="..."
                          />

                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="card-body ps-0 ps-md-4 pt-4 pt-md-0">
                          <div className="card-text card-date pb-2">{reasearchItem.attributes.date}</div>
                          <h6 className="card-subtitle mb-2">{reasearchItem.attributes.title}</h6>
                          <p className="card-text mb-3">{reasearchItem.attributes.summary}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        {visibleEvents < research.length && (
          <p className="text-center m-3 mt-5">
            <button className="btn btn-primary btn-round" id="btn_content" onClick={loadMoreEvents}>More +</button>
          </p>
        )}
      </div></>
  )
}

export function InfographicsList({ research }: researchlist) {
  const [visibleEvents, setVisibleEvents] = useState(4);

  const loadMoreEvents = () => {
    setVisibleEvents(prev => prev + 2);
  };


  return (
    <>
      <Head>
        <title>Infographics | The Youth Print</title>
      </Head>
      <div className="body-container">
        <div className="">
          <div id="children_append" className="row row-cols-1 row-cols-md-3 g-4">
            {research.slice(0, visibleEvents).map((reasearchItem, index) => {
              // Calculate the correct index
              const eventIndex = index + 1;
              return (
                <div className="col-md-12 col-lg-6" key={index}>
                  <Link className="card" href={`/infographics/${reasearchItem.attributes.slug}`}>
                    <div className="row g-0">
                      <div className="col-md-5">
                        <div className="hover-container">
                          <div className="background"></div>
                          <Image
                            className="cars-img-top"
                            src={reasearchItem?.attributes?.infographics?.data?.attributes?.url ? `${NEXT_PUBLIC_API_URL}${reasearchItem.attributes.infographics.data.attributes.url}` : '/path/to/placeholder-image.jpg'}
                            width={reasearchItem?.attributes?.infographics?.data?.attributes?.width || 600}
                            height={reasearchItem?.attributes?.infographics?.data?.attributes?.height || 400}
                            alt="..."
                          />

                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="card-body ps-0 ps-md-4 pt-4 pt-md-0">
                          <div className="card-text card-date pb-2">{reasearchItem.attributes.date}</div>
                          <h6 className="card-subtitle mb-2">{reasearchItem.attributes.title}</h6>
                          <p className="card-text mb-3">{reasearchItem.attributes.summary}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        {visibleEvents < research.length && (
          <p className="text-center m-3 mt-5">
            <button className="btn btn-primary btn-round" id="btn_content" onClick={loadMoreEvents}>More +</button>
          </p>
        )}
      </div></>
  )
}


export async function getStaticProps() {
  try {
    const response = await apiClient.get("/api/infographics?sort[0]=date:desc&populate=*");
    const research = response?.data?.data;

    return {
      props: {
        research,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      props: {
        research: [],
      },
    };
  }
}