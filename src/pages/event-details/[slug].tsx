import Link from 'next/link';
import React, { useState } from 'react';
import { apiClient } from "../../util/axios";
import { EventProps, type Event } from '../../interface/events';
import { BlocksContent } from '@strapi/blocks-react-renderer';
import Image from "next/image";
import ArticleContent from '../../app/components/articles';
import DevelopmentPartners from '@/app/components/partners';
import Related from '@/app/components/related'; // Import the related content component
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { NEXT_PUBLIC_API_URL } from "../../app/components/config";
import * as Yup from 'yup'; // Import Yup here
import { error } from 'console';
import Head from 'next/head';

interface Params extends ParsedUrlQuery {
    slug: string;
}

/* const token = process.env.OCP_APIM_SUBSCRIPTION_KEY;
console.log("Token: ", token) */

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required').matches(/^\d{10}$/, 'Phone number must be 10 digits'),
    organisation: Yup.string(),
});

export default function Eventdetails({ event, relatedEvents }: EventProps) {


    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    const content: BlocksContent = event?.attributes.content ?? [];

    const formatTime = (time: string): string => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const values = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            organisation: formData.get('organisation') as string,
        };

        try {
            await validationSchema.validate(values, { abortEarly: false });
            setFormErrors({});

            setSuccessMessage(null);

            const participants = [...(event?.attributes.participants || [])];


            const updatedParticipants = participants.map(({ id, ...participant }) => participant);

            const isAlreadyParticipant = updatedParticipants.some(
                (participant) => participant.email === values.email && participant.name === values.name
            );

            if (!isAlreadyParticipant) {
                updatedParticipants.push({
                    name: values.name,
                    email: values.email,
                    organisation: values.organisation,
                    phone: values.phone,
                });


                await apiClient.put(`/api/events/${event?.id}`, {
                    "data": {
                        "participants": updatedParticipants,
                    },
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setSuccessMessage('Registration successful! Thank you for registering.');
                setIsRegistered(true);
            } else {
                setSuccessMessage('You are already registered for this event.');
            }

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors: { [key: string]: string } = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        errors[error.path] = error.message;
                    }
                });
                setFormErrors(errors);
            }
        }
    };

    return (
        <>
            <Head>
                <title>{event?.attributes.title} | The Youth Print</title>
            </Head>
            <div className="body-container">
                <div className="container-wide">
                    <div className="img-container img-container-large fadeInOpacity active"
                        style={{ backgroundImage: `url(${NEXT_PUBLIC_API_URL}${event?.attributes.headerImage.data.attributes.url})` }} >
                    </div>
                </div>
                <div className="container-full">
                    <div className="row">
                        <div className="col-lg-3 order-2 order-sm-2 order-md-2 order-lg-1 order-xl-1">
                            <div className="mt-5 stick-container">
                                <div className="side-box sticky">
                                    <div className="heading">
                                        <h6>Event details</h6>
                                    </div>
                                    <p className="pb-3" style={{ display: 'flex', alignItems: 'center' }}  >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                        </svg>&nbsp;Date: {event?.attributes.date}
                                    </p>

                                    <p className="pb-3" style={{ display: 'flex', alignItems: 'center' }}  >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                        </svg>&nbsp; Time: {formatTime(event?.attributes.startTime || '')} to {formatTime(event?.attributes.endTime || '')}
                                    </p>

                                    <p className="pb-3" style={{ display: 'flex', alignItems: 'center' }}  >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-buildings" viewBox="0 0 16 16">
                                            <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z" />
                                            <path d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z" />
                                        </svg>&nbsp;  Venue: {event?.attributes.venue}
                                    </p>

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
                            </div>
                        </div>
                        <div className="col-lg-6 order-1 order-sm-1 order-md-1 order-lg-2 order-xl-2 col-white-block">
                            <ArticleContent content={content} title={event?.attributes.title} summary={event?.attributes.summary} />
                        </div>
                        <div className="col-lg-3 order-3 " >
                            <div className="mt-5">
                                <div className="side-box">
                                    <h6>Event enquiry</h6>
                                    <p>{event?.attributes.enquiry}</p>



                                    {isRegistered ? (
                                        <div className="alert alert-success mt-4" role="alert">
                                            {successMessage}
                                        </div>
                                    ) : (
                                        <>
                                            <h6>Register now</h6>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row pb-md-3">
                                                    <div className="col-12">
                                                        <label htmlFor="name" className="form-label">
                                                            Name: <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            id="name"
                                                            name="name"
                                                            className="form-control" />
                                                        {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
                                                    </div>
                                                </div>

                                                <div className="row pb-md-3">
                                                    <div className="col-12">
                                                        <label htmlFor="email" className="form-label">
                                                            Email: <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            id="email"
                                                            name="email"
                                                            className="form-control" />
                                                        {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
                                                    </div>
                                                </div>

                                                <div className="row pb-md-3">
                                                    <div className="col-12">
                                                        <label htmlFor="phone" className="form-label">
                                                            Phone Number: <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="string"
                                                            required
                                                            id="phone"
                                                            name="phone"
                                                            className="form-control" />
                                                        {formErrors.phone && <div className="text-danger">{formErrors.phone}</div>}
                                                    </div>
                                                </div>

                                                <div className="row pb-md-3">
                                                    <div className="col-12">
                                                        <label htmlFor="organisation" className="form-label">
                                                            Organisation: {/* <span className="text-danger">*</span> */}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            id="organisation"
                                                            name="organisation"
                                                            className="form-control" />
                                                        {formErrors.organisation && <div className="text-danger">{formErrors.organisation}</div>}
                                                    </div>
                                                </div>

                                                <div className="text-center pt-3">

                                                    <button id="btn_subscribe" className="btn btn-success text-upper ps-5 pe-5 me-3 btn btn-primary btn-round" type="submit">
                                                        Register
                                                    </button>
                                                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                                </div>
                                            </form></>)}








                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DevelopmentPartners />
                <div className="container-full pt-5">
                    <div className="heading mb-1">
                        <h6>Related content</h6>
                    </div>
                    <div className="mb-4">
                        {event?.attributes.topic_tags.data.map((tag, index) => (
                            <Link key={index} className="btn btn-success btn-sm me-2 mb-3" href={`/relatedtopic/${'events'}/${encodeURIComponent(tag.attributes.slug)}`}>
                                {tag.attributes.title}
                            </Link>
                        ))}
                    </div>
                    <Related events={relatedEvents} NEXT_PUBLIC_API_URL={NEXT_PUBLIC_API_URL || ''} />
                </div>
            </div></>
    );
}

export const getServerSideProps: GetServerSideProps<EventProps, Params> = async (context: GetServerSidePropsContext<Params>): Promise<GetServerSidePropsResult<EventProps>> => {
    const { slug } = context.params!;
    try {
        const response = await apiClient.get(`/api/events?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);

        if (response.data.data.length === 0) {
            return { notFound: true };
        }

        const event = response.data.data[0] as Event;

        // Fetch related events (e.g., by tags or some other criteria)
        const relatedResponse = await apiClient.get(`/api/events?populate=*`);
        const relatedEvents = relatedResponse.data.data;

        return {
            props: {
                event,
                relatedEvents,
            },
        };
    } catch (error) {
        console.error("Error fetching events:", error);
        return {
            props: {
                event: null,
                relatedEvents: [],
            },
            notFound: true,
        };
    }
}
