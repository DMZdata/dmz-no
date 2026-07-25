import { useEffect, useState } from "react";
import { Sun, Moon, Search, Image as ImageIcon, Sparkles, ExternalLink } from "lucide-react";
import BackgroundEffect from "@/components/BackgroundEffect";
import WeatherWidget from "@/components/WeatherWidget";
import { useTheme } from "@/components/ThemeProvider";

type Link = { label: string; href: string };
type Group = { title: string; links: Link[] };

const groups: Group[] = [
  {
    title: "Aviser",
    links: [
      { label: "VG", href: "https://www.vg.no" },
      { label: "Dagbladet", href: "https://www.dagbladet.no" },
      { label: "Nettavisen", href: "https://www.nettavisen.no" },
      { label: "NRK", href: "https://www.nrk.no" },
      { label: "Aftenposten", href: "https://www.aftenposten.no" },
      { label: "DN", href: "https://www.dn.no" },
      { label: "E24", href: "https://e24.no" },
    ],
  },
  {
    title: "Drammen & Lier",
    links: [
      { label: "Drammens Tidende (DT)", href: "https://www.dt.no" },
      { label: "Lierposten", href: "https://www.lierposten.no" },
      { label: "Drammen kommune", href: "https://www.drammen.kommune.no" },
      { label: "Lier kommune", href: "https://www.lier.kommune.no" },
      { label: "Yr – Drammen", href: "https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-73338/Norge/Buskerud/Drammen/Drammen" },
      { label: "Yr – Lier", href: "https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-73607/Norge/Buskerud/Lier/Lier" },
    ],
  },
  {
    title: "Kart & Oppslag",
    links: [
      { label: "Google Maps", href: "https://www.google.no/maps" },
      { label: "Gule Sider", href: "https://www.gulesider.no" },
      { label: "1881", href: "https://www.1881.no" },
      { label: "Finn.no", href: "https://www.finn.no" },
      { label: "Wikipedia", href: "https://no.wikipedia.org" },
    ],
  },
  {
    title: "Bank",
    links: [
      { label: "DNB", href: "https://www.dnb.no" },
      { label: "Sparebank 1", href: "https://www.sparebank1.no" },
      { label: "Nordea", href: "https://www.nordea.no" },
      { label: "Skatteetaten", href: "https://www.skatteetaten.no" },
    ],
  },
  {
    title: "Veteranbil – Norge",
    links: [
      { label: "LMK – Motorhistorisk", href: "https://lmk.no" },
      { label: "AMCAR", href: "https://www.amcar.no" },
      { label: "Finn – Veteran", href: "https://www.finn.no/mobility/search/car?body_type=8" },
      { label: "A-Ford Klubben Norge", href: "https://www.a-ford.no" },
      { label: "Saab Veteran Klubb", href: "https://www.saabveteranklubb.no" },
      { label: "Norsk Ferrari Klubb", href: "https://ferrariklubben.no" },
      { label: "Aston Martin Owners Club Norge", href: "https://www.amocscandinavia.com" },
      { label: "Bentley Drivers Club", href: "https://bdcl.org" },
    ],
  },
  {
    title: "Klassiske biler – Internasjonalt",
    links: [
      { label: "Classic Driver", href: "https://www.classicdriver.com" },
      { label: "Bring a Trailer", href: "https://bringatrailer.com" },
      { label: "Classic.com", href: "https://www.classic.com" },
      { label: "Hemmings", href: "https://www.hemmings.com" },
      { label: "Car & Classic", href: "https://www.carandclassic.com" },
      { label: "Iconic Auctioneers", href: "https://iconicauctioneers.com" },
      { label: "RM Sotheby's", href: "https://rmsothebys.com" },
      { label: "Bonhams Cars", href: "https://cars.bonhams.com" },
    ],
  },
  {
    title: "Deler & Reservedeler",
    links: [
      { label: "eBay Motors", href: "https://www.ebay.com/b/eBay-Motors/6000" },
      { label: "eBay UK – Classic Parts", href: "https://www.ebay.co.uk/b/Classic-Car-Parts/262219" },
      { label: "Skandix (klassisk Saab/Volvo)", href: "https://www.skandix.de" },
      { label: "Bratteng (A-Ford deler)", href: "https://www.macsautoparts.com" },
      { label: "Aston Martin Heritage Parts", href: "https://www.astonmartin.com/en/heritage" },
      { label: "Bentley Heritage", href: "https://www.bentleymotors.com/en/models/heritage.html" },
    ],
  },
  {
    title: "YouTube – Veteranbil",
    links: [
      { label: "Harry's Garage (Bentley/Aston)", href: "https://www.youtube.com/@HarrysGarage" },
      { label: "Number 27 (Bentley)", href: "https://www.youtube.com/@Number27" },
      { label: "Jay Leno's Garage", href: "https://www.youtube.com/@jaylenosgarage" },
      { label: "Petrolicious", href: "https://www.youtube.com/@Petrolicious" },
      { label: "Tyrrell's Classic Workshop", href: "https://www.youtube.com/@TyrrellsClassicWorkshop" },
      { label: "Iconic Auctioneers", href: "https://www.youtube.com/@iconicauctioneers" },
      { label: "Ferrari (offisiell)", href: "https://www.youtube.com/@Ferrari" },
      { label: "Aston Martin (offisiell)", href: "https://www.youtube.com/@astonmartin" },
      { label: "Bentley Motors (offisiell)", href: "https://www.youtube.com/@BentleyMotors" },
    ],
  },
];

const SearchForm = ({
  action,
  placeholder,
  buttonLabel,
  icon,
  hidden,
  paramName = "q",
}: {
  action: string;
  placeholder: string;
  buttonLabel: string;
  icon: React.ReactNode;
  hidden?: Record<string, string>;
  paramName?: string;
}) => (
  <form
    action={action}
    method="GET"
    target="_blank"
    className="flex items-stretch gap-2 w-full"
  >
    <div className="flex items-center gap-2 flex-1 min-w-0 bg-card border border-border rounded-md px-3 focus-within:ring-2 focus-within:ring-ring">
      <span className="text-muted-foreground shrink-0">{icon}</span>
      <input
        type="text"
        name={paramName}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent py-3 text-base md:text-lg outline-none text-foreground placeholder:text-muted-foreground"
        autoComplete="off"
      />
    </div>
    {hidden &&
      Object.entries(hidden).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
    <button
      type="submit"
      className="shrink-0 px-4 md:px-5 rounded-md bg-foreground text-background font-medium text-base md:text-lg hover:opacity-90 transition-opacity"
    >
      {buttonLabel}
    </button>
  </form>
);

const Startsiden = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.title = "Startsiden — DMZ.NO";
    const meta = document.querySelector('meta[name="description"]');
    const prev = meta?.getAttribute("content") ?? null;
    meta?.setAttribute("content", "Enkel startside med søk og lenker.");
    // noindex — personlig startside
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, follow");
    return () => {
      if (prev !== null) meta?.setAttribute("content", prev);
      robots?.remove();
    };
  }, []);

  const [clock, setClock] = useState<string>("");
  useEffect(() => {
    const update = () =>
      setClock(
        new Date().toLocaleString("no-NO", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen grain">
      <BackgroundEffect />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 md:py-10">
        {/* Topplinje */}
        <div className="flex items-center justify-between mb-8">
          <a href="/" className="font-heading text-sm md:text-base font-bold tracking-[0.2em] uppercase text-foreground">
            DMZ DATA
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-muted-foreground capitalize">{clock}</span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Bytt tema"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
          Fattern`s startside
        </h1>
        <p className="text-muted-foreground mb-8 md:mb-10 text-base md:text-lg">
          Søk og snarveier — enkelt og oversiktlig.
        </p>

        {/* Søk + vær */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-[minmax(0,1fr)_260px] mb-10 md:mb-12">
          <div className="grid gap-3 md:gap-4 max-w-3xl">
            <SearchForm
              action="https://www.google.no/search"
              placeholder="Søk på Google"
              buttonLabel="Google"
              icon={<Search className="h-5 w-5" />}
            />
            <SearchForm
              action="https://www.google.no/search"
              placeholder="Spør Googles AI (AI Mode)"
              buttonLabel="AI-svar"
              icon={<Sparkles className="h-5 w-5" />}
              hidden={{ udm: "50" }}
            />
            <SearchForm
              action="https://www.google.no/search"
              placeholder="Søk etter bilder"
              buttonLabel="Bilder"
              icon={<ImageIcon className="h-5 w-5" />}
              hidden={{ tbm: "isch" }}
            />
            <SearchForm
              action="https://www.ebay.com/sch/i.html"
              placeholder="Søk på eBay"
              buttonLabel="eBay"
              icon={<Search className="h-5 w-5" />}
              paramName="_nkw"
            />
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base pt-1">
              <a
                href="https://www.ebay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                Åpne eBay <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.google.no"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                Åpne Google <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                Åpne YouTube <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <WeatherWidget />
        </div>


        {/* Lenker */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {groups.map((g) => (
            <section
              key={g.title}
              className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-5 md:p-6"
            >
              <h2 className="font-heading text-lg md:text-xl font-bold mb-4 tracking-tight">
                {g.title}
              </h2>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-base md:text-[17px] text-foreground hover:text-muted-foreground transition-colors underline-offset-4 hover:underline"
                    >
                      {l.label}
                      <ExternalLink className="h-3.5 w-3.5 opacity-40" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className="mt-12 md:mt-16 pt-6 border-t border-border text-xs md:text-sm text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <span>© DMZ DATA AS</span>
          <a href="/" className="hover:text-foreground transition-colors">Til hovedsiden →</a>
        </footer>
      </div>
    </div>
  );
};

export default Startsiden;
