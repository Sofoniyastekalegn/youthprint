import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { NEXT_PUBLIC_API_URL } from "../../app/components/config"
import { stafflist } from '@/interface/staff';
import Item from './item';

interface Item {
 attributes ?: {
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
    <div className="pt-5">
      <div id="children_append" className="row row-cols-1 row-cols-md-3 g-4">
        {items.slice(0, visibleItems).map((item, index) => (
          <div className="col-md-12 col-lg-6" key={index}>
           <Item item={item} baseLink={baseLink}/>
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


