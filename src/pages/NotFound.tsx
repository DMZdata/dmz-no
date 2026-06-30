import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    const prevTitle = document.title;
    const descEl = document.querySelector('meta[name="description"]');
    const prevDesc = descEl?.getAttribute("content") ?? "";
    document.title = "Siden ble ikke funnet | DMZ DATA AS";
    descEl?.setAttribute("content", "Siden du leter etter finnes ikke. Gå tilbake til forsiden hos DMZ DATA AS.");

    // Remove homepage canonical/og:url on 404 so this route doesn't self-attribute to "/"
    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute("href") ?? null;
    canonical?.parentNode?.removeChild(canonical);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    const prevOgUrl = ogUrl?.getAttribute("content") ?? null;
    ogUrl?.parentNode?.removeChild(ogUrl);

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
      descEl?.setAttribute("content", prevDesc);
      if (prevCanonical && canonical) document.head.appendChild(canonical);
      if (prevOgUrl && ogUrl) document.head.appendChild(ogUrl);
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
