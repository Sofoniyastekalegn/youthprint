
"use client"
import React, { createContext, useContext, ReactNode } from 'react';
import { Tags } from "@/interface/home";


export const ResearchTagsContext = createContext<Tags[] | undefined>(undefined);

export const ResearchTagsProvider: React.FC<{ children: ReactNode, value: Tags[] }> = ({ children, value }) => {
    return (
        <ResearchTagsContext.Provider value={value}>
            {children}
        </ResearchTagsContext.Provider>
    );
};

export const useResearchTags = () => useContext(ResearchTagsContext);
