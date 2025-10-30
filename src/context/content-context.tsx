"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MOCK_CONTENT as initialContent, type Content } from "@/lib/content";

export type { Content };

interface ContentContextType {
  content: Content[];
  addContent: (item: Content) => void;
  removeContent: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content[]>(initialContent);

  const addContent = (item: Content) => {
    setContent((prevContent) => [...prevContent, item]);
  };

  const removeContent = (id: string) => {
    setContent((prevContent) => prevContent.filter((item) => item.id !== id));
  };

  return (
    <ContentContext.Provider value={{ content, addContent, removeContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
