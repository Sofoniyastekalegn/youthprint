import '../app/globals.css'
import App, { AppProps } from 'next/app'
import RootLayout from '../app/layout'
import { ResearchTagsProvider } from '@/app/contexts/ResearchTagsContext'
import Head from 'next/head'
import Image from 'next/image'
import { apiClient } from '@/util/axios'

function MyApp({ Component, pageProps }: AppProps) {
  return (


    <RootLayout>
      <Head>
        <title>The Youth Print</title>
        <meta name="description" content="Explore the latest updates, blogs, and publications from The Youth Print. Stay informed on youth-related topics and subscribe for more." />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <ResearchTagsProvider value={pageProps?.researchTags}>
        <Component {...pageProps} />
      </ResearchTagsProvider>
    </RootLayout>





  )
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);

  // Fetch research tags from the API
  let researchTags = [];
  try {
    const tagsResponse = await apiClient.get("/api/research-tags?populate=*");
    researchTags = tagsResponse.data.data; // Adjust based on your API response structure
  } catch (error) {
    console.error("Failed to fetch research tags:", error);
  }

  return { ...appProps, pageProps: { ...appProps.pageProps, researchTags } };
};

export default MyApp;