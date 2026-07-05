import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * JSON-LD Schema markup for SEO
 * Helps search engines understand your page content
 */

interface SchemaConfig {
  title: string;
  description: string;
  imageUrl?: string;
  path: string;
}

export function useJsonLd(config: SchemaConfig) {
  const { title, description, imageUrl, path } = config;

  useEffect(() => {
    const siteUrl = window.location.origin;
    const pageUrl = `${siteUrl}${path}`;

    // Organization schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AWS Student Builder Group HITMS",
      description: "Hands-on cloud, AI and builder culture for students",
      url: siteUrl,
      logo: `${siteUrl}/src/assets/aws-hitms-logo.jpeg`,
      sameAs: [
        "https://aws.amazon.com/studentbuildergroup",
        "https://www.instagram.com",
        "https://www.linkedin.com",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "General",
        email: "contact@sbg-hitms.dev",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressRegion: "Delhi",
        streetAddress: "HITMS, New Delhi",
      },
    };

    // Breadcrumb navigation schema
    const pathSegments = path
      .split("/")
      .filter((s) => s)
      .map((segment, index, arr) => ({
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        item: `${siteUrl}/${arr.slice(0, index + 1).join("/")}`,
      }));

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        ...pathSegments.map((segment, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: segment.name,
          item: segment.item,
        })),
      ],
    };

    // Page schema
    const pageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description: description,
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "AWS Student Builder Group HITMS",
        url: siteUrl,
      },
      primaryImageOfPage: imageUrl
        ? {
            "@type": "ImageObject",
            url: imageUrl,
          }
        : undefined,
      datePublished: new Date().toISOString().split("T")[0],
      author: {
        "@type": "Organization",
        name: "AWS Student Builder Group HITMS",
      },
    };

    // Event schema (for events page)
    const eventSchema =
      path === "/events"
        ? {
            "@context": "https://schema.org",
            "@type": "EventSeries",
            name: "AWS Student Builder Group Events",
            description:
              "Regular cloud building workshops, talks, and networking events",
            organizer: {
              "@type": "Organization",
              name: "AWS Student Builder Group HITMS",
            },
          }
        : null;

    // Create and append script tags
    const schemas = [organizationSchema, breadcrumbSchema, pageSchema];
    if (eventSchema) schemas.push(eventSchema);

    const scriptIds = schemas.map((schema, index) => {
      const scriptId = `schema-${index}`;
      let script = document.getElementById(scriptId);

      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      } else {
        script.textContent = JSON.stringify(schema);
      }

      return scriptId;
    });

    return () => {
      // Cleanup on unmount
      scriptIds.forEach((id) => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, [title, description, imageUrl, path]);
}

/**
 * Enhanced meta tags for social sharing and SEO
 */
export function useMetaTags(config: {
  title: string;
  description: string;
  imageUrl?: string;
  path: string;
}) {
  useEffect(() => {
    const { title, description, imageUrl, path } = config;
    const pageUrl = `${window.location.origin}${path}`;

    // Update Open Graph tags
    const ogTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: pageUrl },
      { property: "og:type", content: "website" },
    ];

    if (imageUrl) {
      ogTags.push({ property: "og:image", content: imageUrl });
    }

    // Update Twitter tags
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ];

    if (imageUrl) {
      twitterTags.push({ name: "twitter:image", content: imageUrl });
    }

    [...ogTags, ...twitterTags].forEach((tag) => {
      const selector = tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`;
      let metaTag = document.querySelector(selector);

      if (!metaTag) {
        metaTag = document.createElement("meta");
        if (tag.property) {
          metaTag.setAttribute("property", tag.property);
        } else {
          metaTag.setAttribute("name", tag.name);
        }
        document.head.appendChild(metaTag);
      }

      metaTag.setAttribute("content", tag.content);
    });
  }, [config]);
}
