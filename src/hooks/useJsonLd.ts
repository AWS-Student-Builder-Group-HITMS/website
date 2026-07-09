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
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const siteUrl = window.location.origin;
    const pageUrl = `${siteUrl}${normalizedPath}`;
    const siteName = "AWS Student Builder Group HITMS";
    const organizationId = `${siteUrl}/#organization`;
    const websiteId = `${siteUrl}/#website`;
    const breadcrumbId = `${pageUrl}#breadcrumb`;

    const organizationSchema = {
      "@type": "Organization",
      "@id": organizationId,
      name: siteName,
      description: "Hands-on cloud, AI and builder culture for students",
      url: siteUrl,
      logo: `${siteUrl}/src/assets/aws-hitms-logo.jpeg`,
      sameAs: [
        "https://aws.amazon.com/studentbuildergroup",
        "https://www.instagram.com/awssbghitms",
        "https://www.linkedin.com/company/aws-student-builder-group-hitms",
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

    const pathSegments = normalizedPath
      .split("/")
      .filter((segment) => segment)
      .map((segment, index, arr) => ({
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        item: `${siteUrl}/${arr.slice(0, index + 1).join("/")}`,
      }));

    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
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

    const pageSchema = {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      isPartOf: {
        "@id": websiteId,
      },
      breadcrumb: {
        "@id": breadcrumbId,
      },
      primaryImageOfPage: imageUrl
        ? {
            "@type": "ImageObject",
            url: imageUrl,
          }
        : undefined,
      datePublished: new Date().toISOString().split("T")[0],
      author: {
        "@id": organizationId,
      },
    };

    const websiteSchema = {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteName,
      url: siteUrl,
      description: "Hands-on cloud, AI and builder culture for students",
      publisher: {
        "@id": organizationId,
      },
    };

    const eventSchema: Record<string, unknown> | null =
      normalizedPath === "/events"
        ? {
            "@type": "EventSeries",
            name: "AWS Student Builder Group Events",
            description: "Regular cloud building workshops, talks, and networking events",
            organizer: {
              "@id": organizationId,
            },
          }
        : null;

    const schemaGraph: Array<Record<string, unknown>> = [
      organizationSchema,
      websiteSchema,
      breadcrumbSchema,
      pageSchema,
    ];
    if (eventSchema) schemaGraph.push(eventSchema);

    const fullSchema = {
      "@context": "https://schema.org",
      "@graph": schemaGraph,
    };

    const scriptId = "site-jsonld-schema";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(fullSchema, null, 2);

    return () => {
      const currentScript = document.getElementById(scriptId);
      if (currentScript) currentScript.remove();
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

    interface MetaTag {
      property?: string;
      name?: string;
      content: string;
    }

    // Update Open Graph tags
    const ogTags: MetaTag[] = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: pageUrl },
      { property: "og:type", content: "website" },
    ];

    if (imageUrl) {
      ogTags.push({ property: "og:image", content: imageUrl });
    }

    // Update Twitter tags
    const twitterTags: MetaTag[] = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ];

    if (imageUrl) {
      twitterTags.push({ name: "twitter:image", content: imageUrl });
    }

    [...ogTags, ...twitterTags].forEach((tag) => {
      const isPropertyTag = !!tag.property;
      const selector = isPropertyTag
        ? `meta[property="${tag.property}"]`
        : `meta[name="${tag.name}"]`;
      let metaTag = document.querySelector(selector);

      if (!metaTag) {
        metaTag = document.createElement("meta");
        if (isPropertyTag && tag.property) {
          metaTag.setAttribute("property", tag.property);
        } else if (tag.name) {
          metaTag.setAttribute("name", tag.name);
        }
        document.head.appendChild(metaTag);
      }

      metaTag.setAttribute("content", tag.content);
    });
  }, [config]);
}
