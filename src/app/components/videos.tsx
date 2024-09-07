import { videosAttributes, videosdata, videosinfo } from "@/interface/videos";
import Image from "next/image";
import youtubeLogo from "../assets/youtube.png"
import Link from "next/link";


export function extractLastIdFromUrl(url: string) {
    const parts = url.split('=');
    return parts[parts.length - 1];
}


interface VideosProps {
    Videos: videosdata | null;
}


const Videos = ({ Videos }: VideosProps) => {
    const Video = Videos?.data.map((video: videosinfo) => {
        return video.attributes;
    }); 
    return (
        
<div className="row row-cols-md-3 g-4">
                        {Video?.slice(0,4).map((videoImage : videosAttributes, index : number)  => (
                                <div key={index} className="col-sm-6 col-md-4 col-lg-3 h-100 ">
                                    <Link href={`/video/${ videoImage.slug}`} className="card h-100 ">
                                        <div className="hover-container" id={`videoImage_${index}`}>
                                            <div className="background"></div>
                                            <Image
                                                className='w-100'
                                                src={"https://img.youtube.com/vi/" + extractLastIdFromUrl(videoImage.link) + "/maxresdefault.jpg"}
                                                width= '580'
                                                height='283'
                                                alt={'IMAGE'}
                                            />
                                            <button
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',  
                                                    left: '50%',  
                                                    transform: 'translate(-50%, -50%)',  
                                                }}
                                            >
                                                <Image src={youtubeLogo} alt="Play" width={50} height={50} />
                                            </button>
                                        </div>
                                        
                                    </Link>
                                    <div className="card-body ps-2 pe-2 pt-2">
                                            <h6 className="card-related-title mb-4">{videoImage.title}</h6>
                                        </div>
                                </div>
                            ))}
                        </div>



        
    );
}

export default Videos;