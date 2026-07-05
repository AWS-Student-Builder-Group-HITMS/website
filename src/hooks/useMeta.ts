import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useJsonLd, useMetaTags } from "./useJsonLd";

interface MetaProps {
  title: string;
  description?: string;
  imageUrl?: string;
}

export function useMeta({ title, description, imageUrl }: MetaProps) {
  const location = useLocation();

  // Use JSON-LD for structured data
  useJsonLd({
    title,
    description: description || "",
    imageUrl,
    path: location.pathname,
  });

  // Use enhanced meta tags for social sharing
  useMetaTags({
    title,
    description: description || "",
    imageUrl,
    path: location.pathname,
  });

  useEffect(() => {
    // Set title
    document.title = title;

    // Set description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }
  }, [title, description]);
}
