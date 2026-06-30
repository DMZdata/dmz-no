import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    const newTitle = "Siden ble ikke funnet | DMZ DATA AS";
    const newDesc = "Siden du leter etter finnes ikke. Gå tilbake til forsiden hos DMZ DATA AS.";

    const prevTitle = document.title;
    document.title = newTitle;

    const setMeta = (selector: string, attr: "content", value: string) => {
      const el = document.querySelector(selector) as HTMLMetaElement | null;
      const prev = el?.getAttribute(attr) ?? null;
      el?.setAttribute(attr, value);
      return { el, prev };
    };

    const desc = setMeta('meta[name="description"]', "content", newDesc);
    const ogTitle = setMeta('meta[property="og:title"]', "content", newTitle);
    const ogDesc = setMeta('meta[property="og:description"]', "content", newDesc);
    const ogUrlEl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    const prevOgUrl = ogUrlEl?.getAttribute("content") ?? null;
    ogUrlEl?.setAttribute("content", `https://dmz.no${location.pathname}`);

    // Remove homepage canonical so the 404 route doesn't self-attribute to "/"
    const canonical = document.querySelector('link[rel="canonical"]');
    const canonicalParent = canonical?.parentNode ?? null;
    if (canonical && canonicalParent) canonicalParent.removeChild(canonical);

    // Tell crawlers not to index the 404 route
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const createdRobots = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const prevRobots = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, follow");

    return () => {
      document.title = prevTitle;
      if (desc.el && desc.prev !== null) desc.el.setAttribute("content", desc.prev);
      if (ogTitle.el && ogTitle.prev !== null) ogTitle.el.setAttribute("content", ogTitle.prev);
      if (ogDesc.el && ogDesc.prev !== null) ogDesc.el.setAttribute("content", ogDesc.prev);
      if (ogUrlEl && prevOgUrl !== null) ogUrlEl.setAttribute("content", prevOgUrl);
      if (canonical && canonicalParent) canonicalParent.appendChild(canonical);
      if (createdRobots) {
        robots?.parentNode?.removeChild(robots);
      } else if (prevRobots !== null) {
        robots?.setAttribute("content", prevRobots);
      }
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
