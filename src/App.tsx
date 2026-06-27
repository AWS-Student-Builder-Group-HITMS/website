import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./routes/index";
import About from "./routes/about";
import Events from "./routes/events";
import Members from "./routes/members";
import Resources from "./routes/resources";
import Contact from "./routes/contact";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
    </BrowserRouter>
  );
}
