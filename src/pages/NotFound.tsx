import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
    document.title = "Siden ble ikke funnet | DMZ DATA AS";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Siden du leter etter finnes ikke. Gå tilbake til forsiden hos DMZ DATA AS.");
    return () => {
      document.title = prevTitle;
      document.querySelector('meta[name="description"]')?.setAttribute("content", prevDesc);
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
