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
    <div>
      <Header researchTags={tags || []} />
      {children}
      <Footer />
    </div>
  );
}