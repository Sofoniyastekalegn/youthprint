import { Html, Head, Main, NextScript } from 'next/document';
import { ResearchTagsProvider } from '@/app/contexts/ResearchTagsContext'
import RootLayout from '../app/layout'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        
      </Head>
      <body>
          
            <Main />
            <NextScript />
          
      </body>
    </Html>
  );
}
