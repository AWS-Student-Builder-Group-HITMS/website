import { useEffect } from "react";

interface MetaProps {
  title: string;
  description?: string;
}

export function useMeta({ title, description }: MetaProps) {
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
