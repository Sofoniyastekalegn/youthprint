import React from 'react';
import Image from 'next/image';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import DevelopmentPartners from '@/app/components/partners';
import Link from 'next/link';

interface ArticleContentProps {
  content: BlocksContent;
  title?: string;
  summary?: string;
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const ArticleContent: React.FC<ArticleContentProps> = ({ content, title, summary }) => {
  return (
    <div className="">
      <article className="m-4 mt-5">
        {title && <h3 className="mb-4">{title}</h3>}
        {summary && <h4 className="mb-4">{summary}</h4>}
        <BlocksRenderer
          content={content}
          blocks={{
            quote: ({ children }) => (
              <blockquote>
                {children}
                <div className='share'></div>
              </blockquote>
            ),
            image: ({ image }) => {
              const imageUrl = image?.url ? `${NEXT_PUBLIC_API_URL}${image.url}` : '';
              return (
                <table style={{ width: '100%', maxWidth: '550px', marginLeft: 'auto', marginRight: 'auto', height: 'auto' }} cellSpacing="5" cellPadding="5">
                  <tbody>
                    <tr>
                      <td style={{ padding: '5px' }}></td>
                      <td style={{ padding: '10px', border: '1px solid #cccccc' }}>
                        <div style={{ backgroundColor: 'rgb(255, 255, 255)', padding: '5px', fontSize: '15px', lineHeight: '110%', textAlign: 'center' }}>
                          <strong>{image.name}</strong>
                        </div>
                        <div style={{ backgroundColor: 'rgb(255, 255, 255)', padding: '5px', fontSize: '15px', lineHeight: '110%', textAlign: 'center' }}>
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={image.alternativeText || ""}
                              width={image.width || 550} // Provide a default width if not defined
                              height={image.height || 400} // Provide a default height if not defined
                            />
                          )}
                          <br />
                          {image.caption && <>Source: {image.caption}</>}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            },
            list: ({ children }) => (
              <ul>
                {Array.isArray(children) ? children.map((item, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                    {item}
                  </li>
                )) : children}
              </ul>
            ),
            link: ({ url, children }) => (
              <Link href={url}>{children}</Link>
            )
          }}
        />
      </article>
    </div>
  );
};

export default ArticleContent;