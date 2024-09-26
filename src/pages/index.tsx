// Import necessary libraries
// Import necessary libraries
import Image from "next/image";
import { apiClient } from "../util/axios";
import { HomeProps } from "@/interface/home";
import Link from "next/link";
import { videosinfo, videosAttributes } from "@/interface/videos";
import DevelopmentPartners from "../app/components/partners"
import Videos from "@/app/components/videos";
import { Blog } from "@/interface/blog";
import { NEXT_PUBLIC_API_URL } from "../app/components/config"
import { ResearchTagsContext, ResearchTagsProvider } from "@/app/contexts/ResearchTagsContext";
import logger from '../util/logger'
import Head from "next/head";


export default function Home({ weblog, blogs, matchingBlogIndex, researchTags }: HomeProps) {

    const matchingBlog = blogs[matchingBlogIndex] || null;
    console.log("BLOG:", matchingBlog)
    return (
        <ResearchTagsProvider value={researchTags || []}>

            <Head>
                <title>Home | The Youth Print</title>
                <meta name="home" content="Explore the latest updates, blogs, and publications from The Youth Print. Stay informed on youth-related topics and subscribe for more." />
            </Head>
            <div className="body-container">
                <div className='container-full mt-20'>
                    <div className='row'>
                        <div className="col-md-6 home-left fadInLeft">
                            <h4 className="home-intro">
                                <div className="home-intro-text">
                                    {weblog?.headertext}

                                </div>
                            </h4>
                        </div>
                        <div className="col-md-6">
                            <div className="home-banner video fadeInOpacity active relative w-full h-full ">
                                {weblog?.headervid?.data?.attributes.url ? (
                                    <video
                                        className="absolute top-0 left-0 w-full h-full object-cover video-js vjs-tech"
                                        preload="auto"
                                        src={`${NEXT_PUBLIC_API_URL}${weblog.headervid.data.attributes.url}`}
                                        autoPlay
                                        loop
                                        muted
                                        data-setup='{"fluid": true}'
                                        onError={(e) => {
                                            console.error("Video loading error:", e);
                                            console.log("Video URL:", `${NEXT_PUBLIC_API_URL}${weblog.headervid.data.attributes.url}`);
                                        }}
                                    ></video>
                                ) : (
                                    <p>No video available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="body-container">
                    <div className="container-full pb-5 pt-5 fade-in-scroll active">
                        <div className="heading">
                            <h6>The Youth Print Today</h6>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Link className="card h-100" href={`/blogs/${matchingBlog?.attributes?.slug}`}>

                                    <div className="hover-container w-100">
                                        <div className="background">

                                        </div>
                                        <Image
                                            className="card-img-top"
                                            src={matchingBlog?.attributes?.headerImage?.data?.attributes?.url ? `${NEXT_PUBLIC_API_URL || ""}${matchingBlog.attributes.headerImage.data.attributes.url}` : '/path/to/placeholder-image.jpg'}
                                            width={matchingBlog?.attributes?.headerImage?.data?.attributes?.width || 1331}
                                            height={matchingBlog?.attributes?.headerImage?.data?.attributes?.height || 1331}
                                            alt={matchingBlog?.attributes?.headerImage?.data?.attributes?.alternativeText || 'Default Alt Text'}
                                        />

                                    </div>

                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="card-body ps-0 ps-md-2 pe-2 pt-4"></div>

                                        <div className="col-md-8">

                                            <div className=" card-text card-date pb-2">
                                                {weblog?.pinnedPublication?.data?.attributes.date}&nbsp;/ by {/* {weblog?.pinnedPublication?.data?.attributes.author} */}
                                                {matchingBlog?.attributes.authors.data?.map((author, index) => (

                                                    author.attributes.name

                                                ))}
                                            </div>
                                            <h6 className="card-subtitle mb-3"> {weblog?.pinnedPublication?.data?.attributes.title}</h6>
                                            <p className="card-text mb-3">
                                                {weblog?.pinnedPublication?.data?.attributes.summary}
                                            </p>

                                        </div >
                                    </div >
                                </Link >
                            </div >
                            <div className="col-md-6">
                                

                                <div id="news_append" className="row g-4">
                                    {blogs.slice(0, 3).map((blog, index) => (
                                        <div key={index} className="col-12">
                                            <Link className="card" href={`/publication/${blog.attributes.slug}`}>
                                                <div className="row g-4">
                                                    <div className="col-md-5">
                                                        <div className="hover-container">
                                                            <div className="background"></div>
                                                            <Image
                                                                className="w-100"
                                                                src={blog?.attributes?.headerImage?.data?.attributes?.url ? `${NEXT_PUBLIC_API_URL}${blog.attributes.headerImage.data.attributes.url}` : '/path/to/placeholder-image.jpg'}
                                                                width={blog?.attributes?.headerImage?.data?.attributes?.width || 600}
                                                                height={blog?.attributes?.headerImage?.data?.attributes?.height || 400}
                                                                alt="IMAGE"
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="card-body p-0 ps-0 ps-md-4 pt-4 pt-md-0">
                                                            <div className="card-text card-date pb-2">
                                                                {blog.attributes.date}
                                                                {blog?.attributes.authors ? (
                                                                    <>
                                                                        /by &nbsp;
                                                                        {blog?.attributes.authors?.data?.map((author, index) => (
                                                                            <span key={index}>
                                                                                {author.attributes.name}
                                                                                {index < (matchingBlog?.attributes?.authors?.data?.length ?? 0) - 1 && ", "}
                                                                            </span>
                                                                        ))}
                                                                    </>
                                                                ) : null}
                                                            </div >
                                                            <h6 className="card-subtitle mb-2">{blog.attributes.title}</h6>
                                                            <p className="card-text mb-3">{blog.attributes.summary}</p>
                                                        </div >
                                                    </div >
                                                </div >
                                            </Link >
                                        </div >
                                    ))
                                    }

                                </div >
                            </div >

                        </div >
                        <div className="row">
                            <div className="col-12 text-center">
                                <Link className="btn btn-primary btn-round mt-4 me-md-5" href="/publications/blogs-and-articles">View more blogs</Link>
                            </div>
                        </div>

                        <div className="container-full mb-5 mt-4 fade-in-scroll active">
                            <div className="subscribe-banner">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="col-left">
                                            <h5 className="mb-3"> Subscribe to The Youth Print </h5>
                                            <p>

                                                Get notified about events, media releases, The Youth Print Today, and specific topics of your choosing.


                                            </p>
                                        </div>

                                    </div>

                                    <div className="col-lg-6 text-lg-end ">
                                        <Link className="btn btn-secondary btn-round btn-lg btn-wide text-black mt-4" href="LINK">Subscribe now</Link>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="container-full mb-5 fade-in-scroll active">

                            <div className="heading">
                                <h6>Current work</h6>
                            </div>
                            <Videos Videos={weblog.current_works} />
                        </div>

                        <DevelopmentPartners />
                    </div >
                </div ></div >  </ResearchTagsProvider >
    );
}

// Use getStaticProps for SSG


export async function getStaticProps() {
    try {
        logger.info('================building home page================');
        logger.info(`API URL: ${process.env.NEXT_PUBLIC_API_URL}`);

        logger.info('Fetching home page data...');
        const homeresponse = await apiClient.get("/api/home-p?populate=*");
        logger.info('Home page data fetched:', JSON.stringify(homeresponse.data));

        logger.info('Fetching blog data...');
        const blogresponse = await apiClient.get("/api/publications?sort[0]=date:desc&populate=*");
        logger.info('Blog data fetched:', blogresponse.data);

        /* logger.info('Fetching videos data...');
        const videosresponse = await apiClient.get("/api/current-works?sort[0]=date:desc&populate=*");
        logger.info('Videos data fetched:', videosresponse.data); */

        logger.info('Fetching research tags data...');
        const tagsresponse = await apiClient.get("/api/research-tags?populate=*");
        logger.info('Research tags data fetched:', tagsresponse.data);

        const weblog = homeresponse?.data?.data.attributes;
        console.log(weblog)
        const blogs = blogresponse?.data?.data;
        const researchTags = tagsresponse?.data?.data;

        const matchingBlogIndex = blogs.findIndex((blog: Blog) => blog.id === weblog.pinnedPublication?.data?.id);

        return {
            props: {
                weblog,
                blogs,
                researchTags,
                matchingBlogIndex,
            },
            revalidate: 10,
        };
    } catch (error) {
        logger.error("Error fetching blogs:", error);
        return {
            props: {
                weblog: {
                    headertext: "",
                    headervid: "null",
                },
                blogs: [],
                researchTags: [],
                matchingBlogIndex: -1,
            },
        };
    }
}





