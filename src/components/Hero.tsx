import { ArrowDown, Monitor, Apple } from "lucide-react";

const Hero = () => {
  return (
    <section id="hjem" className="relative min-h-screen flex">
      {/* Tiny remote help links in top-right corner */}
      <div className="fixed top-5 right-20 md:right-32 z-50 flex items-center gap-2">
        <a
          href="https://download.teamviewer.com/download/TeamViewerQS.exe"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10px] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          title="Fjernhjelp Windows"
        >
          <Monitor className="h-3 w-3" />
        </a>
        <a
          href="https://download.teamviewer.com/download/TeamViewerQS.dmg"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10px] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          title="Fjernhjelp Mac"
        >
          <Apple className="h-3 w-3" />
        </a>
      </div>

      {/* Left side - text */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-20">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Stiftet 2001 · Porsgrunn
        </p>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.9] tracking-tight mb-8 opacity-0 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
          Apper,<br />
          nettsider<br />
          & utvikling
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed mb-10 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Vi bygger små, skalerbare og nyttige ting — fra smarthjem-integrasjoner til helsefokuserte nettapper.
        </p>
        <a
          href="#tjenester"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors opacity-0 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          Se mer <ArrowDown className="h-3 w-3" />
        </a>
      </div>

      {/* Right side - decorative */}
      <div className="hidden md:flex flex-1 items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] border border-border rounded-full opacity-20" />
          <div className="absolute w-[200px] h-[200px] lg:w-[260px] lg:h-[260px] border border-border rounded-full opacity-30" />
          <div className="absolute w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] border border-border rounded-full opacity-40" />
          <span className="absolute font-heading text-[120px] lg:text-[180px] font-extrabold text-foreground/[0.03] select-none">
            DMZ
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
