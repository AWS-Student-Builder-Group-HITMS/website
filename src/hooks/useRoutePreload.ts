/**
 * Route preloading utility for better CSR performance.
 * Prefetches route chunks when users hover over links.
 */

export function useRoutePreload() {
  const prefetchRoute = (path: string) => {
    // Prefetch route chunk when link is hovered
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = path;
    document.head.appendChild(link);
  };

  return { prefetchRoute };
}

interface NavigatorWithConnection extends Navigator {
  connection?: {
    saveData?: boolean;
  };
}

/**
 * Hook to automatically prefetch routes on mount
 */
export function usePrefetchRoutes() {
  const routes = ["/about", "/events", "/members", "/resources", "/contact"];

  if (typeof window !== "undefined") {
    const conn = (navigator as NavigatorWithConnection).connection;

    if (conn?.saveData === false) {
      routes.forEach((route) => {
        // Use prefetch hint for better performance
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "fetch";
        link.href = route;
        document.head.appendChild(link);
      });
    }
  }
}
