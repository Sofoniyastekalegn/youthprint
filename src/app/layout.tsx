"use client";

import Header from "../app/components/header"
import Footer from "../app/components/footer"
import { ReactNode, useContext } from 'react';
import { useResearchTags } from "./contexts/ResearchTagsContext";



interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const tags = useResearchTags();

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header researchTags={tags || []} />
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}