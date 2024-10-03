import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { apiClient } from "../../util/axios";
import { type BlocksContent } from '@strapi/blocks-react-renderer';
import ArticleContent from '../../app/components/articles';
import DevelopmentPartners from '@/app/components/partners';
import { BlogPageProps, BlogProps, type Blog } from "../../interface/blog";
import Link from 'next/link';
import Related from '@/app/components/related'; // Ensure the correct import
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { NEXT_PUBLIC_API_URL } from "../../app/components/config"
import Head from 'next/head';

interface Params extends ParsedUrlQuery {
    slug: string;
}



export default function Blog({ blog, allBlogs }: BlogPageProps) {

    const content: BlocksContent = blog?.attributes.content ?? [];

    const [isScrolled, setIsScrolled] = useState(false);
    const partnersRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            const partnersOffsetTop = partnersRef.current ? partnersRef.current.offsetTop : 0;

            if (offset > 615 && window.innerWidth >= 992 && offset + window.innerHeight < partnersOffsetTop) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const relatedBlogIds = blog?.attributes?.relatedpublications?.data?.map(rb => rb.id) || [];
    const relatedBlogs = allBlogs.filter(blog => relatedBlogIds.includes(blog.id));


    return (
        <>
            <Head>
                <title>{blog?.attributes.title} | The Youth Print</title>
            </Head>
            <div className="body-container">
                <div className="container-wide">
                    <div className="img-container img-container-large fadeInOpacity active">
                        <Image
                            src={blog?.attributes?.headerImage?.data?.attributes?.url ? `${NEXT_PUBLIC_API_URL}${blog.attributes.headerImage.data.attributes.url}` : '/path/to/placeholder-image.jpg'}
                            alt="Header Image"
                            layout="fill"
                            objectFit="cover"
                        />

                    </div>
                </div>
                <div className="container-full">
                    <div className="row">
                        <div className="col-lg-3 order-2 order-sm-2 order-md-2 order-lg-1 order-xl-1">
                            <div className="mt-5 stick-container">
                                <div
                                    className={`side-box sticky ${isScrolled ? 'no-print stuck' : ''}`}
                                    style={isScrolled ? { width: '23%', left: '32px', top: '145px', position: 'fixed' } : { width: 'inherit', left: 'inherit', top: 'inherit', position: 'inherit' }}
                                >
                                    <p className="pb-3">
                                        Published on {blog?.attributes.date}
                                    </p>
                                    <div className="pb-3 author-list">
                                        <div style={{ float: 'left' }}>By </div>
                                        <div style={{ marginLeft: '25px' }}>

                                            {blog?.attributes.authors.data?.map((author, index) => (
                                                <div key={index} className="d-inline-block mb-2">

                                                    <Link href={`/author/${author.attributes.slug}`} className='side-box.link'> {author.attributes.name}</Link>
                                                    <br />
                                                    {author.attributes.position} </div>
                                            ))}
                                        </div>

                                    </div>
                                    <p className="pb-3">
                                        <Link className="print-link" href="javascript:;" onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
                                                <path d="M12.7768 4.26667V1.33333H4.90737V4.26667H3.58105V0H14.1032V4.26667H12.7768ZM14.5674 7.71111C14.7442 7.71111 14.8989 7.64444 15.0316 7.51111C15.1642 7.37778 15.2305 7.22222 15.2305 7.04444C15.2305 6.86667 15.1642 
                                            6.71111 15.0316 6.57778C14.8989 6.44444 14.7442 6.37778 14.5674 6.37778C14.3905 6.37778 14.2358 6.44444 14.1032 6.57778C13.9705 6.71111 13.9042 6.86667 13.9042 7.04444C13.9042 7.22222 13.9705 7.37778 14.1032 7.51111C14.2358 
                                            7.64444 14.3905 7.71111 14.5674 7.71111ZM12.7768 14.6667V10.4H4.90737V14.6667H12.7768ZM14.1032 16H3.58105V12.0889H0V6.62222C0 5.95481 0.224737 5.39537 0.67421 4.94389C1.12368 4.49241 1.68 4.26667 2.34316 4.26667H15.3411C16.0049
                                             4.26667 16.5614 4.49241 17.0106 4.94389C17.4597 5.39537 17.6842 5.95481 17.6842 6.62222V12.0889H14.1032V16ZM16.3579 10.7556V6.61744C16.3579 6.32433 16.2604 6.08148 16.0656 5.88889C15.8707 5.6963 15.6292 5.6 15.3411 5.6H2.34316C2.05505
                                              5.6 1.81355 5.69796 1.61866 5.89389C1.42376 6.08982 1.32632 6.33259 1.32632 6.62222V10.7556H3.58105V9.06667H14.1032V10.7556H16.3579Z" fill="black"></path>
                                            </svg>
                                            &nbsp;Print
                                        </Link>
                                    </p>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 order-1 order-sm-1 order-md-1 order-lg-2 order-xl-2 col-white-block">
                            <ArticleContent content={content} title={blog?.attributes.title} summary={blog?.attributes.summary} />
                        </div>

                    </div>
                    {blog?.attributes.fileLink ? (
                        <div className='text-center'>
                            <a className="btn btn-success btn-wide mb-3" href={blog?.attributes.fileLink} target="_blank"> Download Policy Brief 188 PDF </a>

                        </div>
                    ) : null}
                </div>
                <DevelopmentPartners />

                <div className="container-full pt-5">
                    <div className="heading mb-1">
                        <h6>Related content</h6>
                    </div>
                    <div className="mb-4">
                        {blog?.attributes.topic_tags.data.map((tag, index) => (
                            <Link key={index} className="btn btn-success btn-sm me-2 mb-3" href={`/relatedtopic/${'publication'}/${encodeURIComponent(tag.attributes.slug)}`}>
                                {tag.attributes.title}
                            </Link>
                        ))}

                    </div>

                    <Related blogs={relatedBlogs} NEXT_PUBLIC_API_URL={NEXT_PUBLIC_API_URL || ''} />
                </div>
            </div></>
    );
}

// Use getStaticProps for SSG

export const getServerSideProps: GetServerSideProps<BlogProps, Params> = async (context: GetServerSidePropsContext<Params>): Promise<GetServerSidePropsResult<BlogProps>> => {
    const { slug } = context.params!;
    try {
        const blogResponse = await apiClient.get(`/api/publications?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);

        if (blogResponse.data.data.length === 0) {
            return { notFound: true };
        }

        const blog = blogResponse.data.data[0] as Blog;

        const allBlogsResponse = await apiClient.get(`/api/publications?populate=*`);
        const allBlogs = allBlogsResponse.data.data as Blog[];

        return {
            props: {
                blog,
                allBlogs,
            },
        };
    } catch (error) {
        console.error("Error fetching blog:", error);
        return {
            props: {
                blog: null,
                allBlogs: [],
            },
            notFound: true,
        };
    }
}
