import '../app/globals.css'
import type { AppProps } from 'next/app'
import RootLayout from '../app/layout'
import { ResearchTagsProvider } from '@/app/contexts/ResearchTagsContext'
import Head from 'next/head'
import Image from 'next/image'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ResearchTagsProvider value={pageProps.researchTags}>
      <Head>
        <title>The Youth Print</title>
        <meta name="description" content="Explore the latest updates, blogs, and publications from The Youth Print. Stay informed on youth-related topics and subscribe for more." />
        <link rel="icon" href="/icon.ico"/>
      </Head>
      <RootLayout>
      
        <Component {...pageProps} />
      </RootLayout>
    </ResearchTagsProvider>
  )
}

export default MyApp