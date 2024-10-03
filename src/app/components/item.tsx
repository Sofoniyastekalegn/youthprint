import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { NEXT_PUBLIC_API_URL } from "../../app/components/config";
import { stafflist } from '@/interface/staff';

interface Item {
  attributes?: {
    slug: string;
    headerImage: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    date: string;
    title: string;
    summary: string;
    authors?: stafflist;
  } | null;
}

interface ItemProps {
  item: Item;
  baseLink: string;
}

const Item: React.FC<ItemProps> = ({ item, baseLink}) => {


  return (
    <Link className="card" href={`${baseLink}/${item.attributes?.slug}`}>
    <div className="row g-5">
      <div className="col-md-5">
        <div className="hover-container">
          <div className="background"></div>
          <Image
            className='w-100'
            src={NEXT_PUBLIC_API_URL + item.attributes?.headerImage.data.attributes.url}
            width='1313'
            height='738'
            alt="..."
          />
        </div>
      </div>
      <div className="col-md-7">
        <div className="card-body p-0 ps-0 ps-md-4 pt-md-0">
          <div className="card-text card-date pb-2">
            {item.attributes?.date}
            {item.attributes?.authors ? (
              <>
                by  
                {item?.attributes?.authors?.data?.map((author, index) => (
                  <span key={index}>
                    {author.attributes.name}
                    {index < (item.attributes?.authors?.data?.length ?? 0) - 1 && ", "}
                  </span>
                ))}
              </>
            ) : null}
          </div>
          <h6 className="card-subtitle mb-3">{item.attributes?.title}</h6>
          <p className="card-text mb-3">{item.attributes?.summary}</p>
        </div>
      </div>
    </div>
  </Link>
  );
};

export default Item;
