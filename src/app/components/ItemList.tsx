import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { NEXT_PUBLIC_API_URL } from "../../app/components/config"
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
  }| null;
}

interface ItemListProps {
  items: Item[];
  baseLink: string;
  initialVisibleItems?: number;
}

const ItemList: React.FC<ItemListProps> = ({ items, baseLink, initialVisibleItems = 3 }) => {
  const [visibleItems, setVisibleItems] = useState(initialVisibleItems);

  const loadMoreItems = () => {
    setVisibleItems(prev => prev + 2);
  };

  if (!items || items.length === 0) {
    return <div>No items available.</div>;
  }

  return (
    <div className="pt-2">
      <div id="children_append" className="row row-cols-1 row-cols-md-3 g-4">
        {items.slice(0, visibleItems).map((item, index) => (
          <div className="col-md-12 col-lg-6" key={index}>
            <Link className="card" href={`${baseLink}/${item.attributes?.slug}`}>
              <div className="row g-0">
                <div className="col-md-5">
                  <div className="hover-container">
                    <div className="background"></div>
                    <Image
                      className='w-100'
                      src={NEXT_PUBLIC_API_URL + item.attributes?.headerImage?.data?.attributes.url}
                      width='1313'
                      height='738'
                      alt="..."
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="card-body ps-0 ps-md-4 pt-4 pt-md-0">
                    <div className="card-text card-date pb-2">{item.attributes?.date}  {/* &nbsp; */}
                      {item.attributes?.authors? (
                        <>
                          by &nbsp;
                          {item?.attributes.authors?.data?.map((author, index) => (
                            <span key={index}>
                              {author.attributes.name}
                              {index < (item.attributes?.authors?.data?.length ?? 0) - 1 && ", "}
                            </span>
                          ))}
                        </>
                      ) : null}
                    </div>
                    <h6 className="card-subtitle mb-2">{item.attributes?.title}</h6>
                    <p className="card-text mb-3">{item.attributes?.summary}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {visibleItems < items.length && (
        <p className="text-center m-3 mt-5">
          <button className="btn btn-primary btn-round" id="btn_content" onClick={loadMoreItems}>More +</button>
        </p>
      )}
    </div>
  );
};

export default ItemList;
