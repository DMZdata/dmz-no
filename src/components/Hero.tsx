import { Monitor, Apple } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section id="hjem" className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight opacity-0 animate-fade-in">
          DMZ <span className="text-primary">DATA</span> AS
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          Apper, nettsider og produktutvikling
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <span className="text-xs text-muted-foreground mr-1">Fjernhjelp:</span>
          <Button variant="outline" size="sm" asChild className="gap-2 text-xs">
            <a href="https://get.teamviewer.com/dmzdata" target="_blank" rel="noopener noreferrer">
              <Monitor className="h-3.5 w-3.5" /> Windows
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild className="gap-2 text-xs">
            <a href="https://get.teamviewer.com/dmzdatamac" target="_blank" rel="noopener noreferrer">
              <Apple className="h-3.5 w-3.5" /> Mac
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
