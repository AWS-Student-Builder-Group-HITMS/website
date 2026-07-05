import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy, ReactNode } from "react";
import {
  HeroPageLoader,
  EventsPageLoader,
  MembersPageLoader,
  ResourcesPageLoader,
  AboutPageLoader,
  ContactPageLoader,
} from "./components/PageLoadersThemed";

// Lazy load routes for better CSR performance
const Home = lazy(() => import("./routes/index"));
const About = lazy(() => import("./routes/about"));
const Events = lazy(() => import("./routes/events"));
const Members = lazy(() => import("./routes/members"));
const Resources = lazy(() => import("./routes/resources"));
const Contact = lazy(() => import("./routes/contact"));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Themed loader wrapper component
function ThemedLoader() {
  const location = useLocation();

  const loaders: Record<string, ReactNode> = {
    "/": <HeroPageLoader />,
    "/about": <AboutPageLoader />,
    "/events": <EventsPageLoader />,
    "/members": <MembersPageLoader />,
    "/resources": <ResourcesPageLoader />,
    "/contact": <ContactPageLoader />,
  };

  return loaders[location.pathname] || <HeroPageLoader />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<ThemedLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/members" element={<Members />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback route for SPA routing */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
