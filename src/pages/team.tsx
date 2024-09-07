import React, { useState } from 'react';
import Image from "next/image";
import { apiClient } from '../util/axios';
import { Staff, stafflist } from '@/interface/staff';
import { STRAPI_API_URL } from "../app/components/config"
import Link from 'next/link';
import Head from 'next/head';

function extractLinkedInUsername(url: string): string | null {
    const regex = /linkedin\.com\/in\/([a-zA-Z0-9-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function extractXUsername(url: string): string | null {
    const regex = /x\.com\/([a-zA-Z0-9_]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}


export default function Team({ leaders, members }: stafflist) {


    const [selectedPerson, setSelectedPerson] = useState<Staff | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(members)


    const handleProfileClick = (person: Staff | null) => {
        setSelectedPerson(person);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPerson(null);
    };

    return (
        <div className="body-container">
            <div className="content-banner">
                <h5 className="pt-5 mb-4">Our Team</h5>
            </div>
            <div className="pt-5">
                <h4>Leadership</h4>
                <div className="profile-list">
                    {leaders?.map((profile, index) => (
                        <div
                            key={index}
                            className="profile-container"
                            onClick={() => handleProfileClick(profile)}
                        >

                            <div className="profile-picture-container">
                                <div className="profile-picture">
                                    <Image
                                        className="w-80 h-40 object-cover"
                                        src={profile?.attributes?.picture?.data?.attributes?.url ? `${STRAPI_API_URL}${profile.attributes.picture.data.attributes.url}` : '/path/to/placeholder-image.jpg'}
                                        width="1331"
                                        height="1331"
                                        alt=" "
                                    />


                                </div>
                            </div>
                            <div className="profile-title">{profile.attributes.name}</div>
                        </div>
                    ))}
                </div>
                <h4>Members</h4>
                <div className="profile-list">
                    {members?.map((profile, index) => (
                        <div
                            key={index}
                            className="profile-container"
                            onClick={() => handleProfileClick(profile)}
                        >
                            <div className="profile-picture-container">
                                <div className="profile-picture">
                                    <Image
                                        className="w-80 h-40 object-cover"
                                        src={profile?.attributes?.picture?.data?.attributes?.url ? `${STRAPI_API_URL}${profile.attributes.picture.data.attributes.url}` : '/path/to/placeholder-image.jpg'}
                                        width="1331"
                                        height="1331"
                                        alt=" "
                                    />

                                </div>
                            </div>
                            <div className="profile-title">{profile.attributes.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    person={selectedPerson}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}





export async function getStaticProps() {
    try {
        const leaderresponse = await apiClient.get("/api/staffs?filters[role][$eq]=Leadership&&populate=*");
        const membersresponse = await apiClient.get("/api/staffs?filters[role][$eq]=Member&&populate=*");
        const leaders = leaderresponse?.data?.data;
        const members = membersresponse?.data?.data;

        return {
            props: {
                leaders,
                members,
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error("Error fetching events:", error);
        return {
            props: {
                leaders: [],
                members: [],
            },
        };
    }
}



// Simple Modal Component
const Modal = ({ person, onClose }: { person: Staff | null; onClose: () => void }) => {
    if (!person) return null;

    return (
        <>
            <Head>
                <title>Teams | The Youth Print</title>
            </Head>

            <div className="fixed  inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 mt-16 pt-16  ">


                <div className="relative bg-white p-6 rounded-lg w-1/2 items-start modal-dialog ">


                    <button className="absolute top-2 right-2" onClick={onClose}>



                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-800"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <div className="flex ">
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="profile-picture">
                                    <Image
                                        className="w-80 h-80 object-cover"
                                        src={person?.attributes?.picture?.data?.attributes?.url ? `${STRAPI_API_URL}${person.attributes.picture.data.attributes.url}` : '/path/to/placeholder-image.jpg'}
                                        width="1331"
                                        height="1331"
                                        alt=" "
                                    />

                                    <br />
                                    {person.attributes.publications.data && (<a className="btn btn-primary btn-round" href={`/author/${person.attributes.slug}`}>View publications by {person.attributes.name}</a>)}

                                </div>
                            </div>
                            <div className="col-md-6">
                                <h2 className="text-xl font-bold">{person.attributes.name}</h2>
                                {person.attributes.linkdeln && (
                                    <div className='pb-2'>
                                        <h5>
                                            <Link href={person.attributes.linkdeln}> Linkedin:&nbsp;
                                                <span style={{ color: 'blue' }}>
                                                    {extractLinkedInUsername(person.attributes.linkdeln)}
                                                </span>
                                            </Link>
                                        </h5>
                                    </div>
                                )}

                                {person.attributes.twitter && (
                                    <div className='pb-2'>
                                        <h5>
                                            <Link href={person.attributes.twitter}> Twitter:&nbsp;


                                                <span style={{ color: 'blue' }}>
                                                    {extractXUsername(person.attributes.twitter)}
                                                </span>
                                            </Link>
                                        </h5>
                                    </div>
                                )}
                                <p>{person.attributes.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};