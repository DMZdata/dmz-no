import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "Sleep Test",
    description: "Digital søvntest for kartlegging av søvnkvalitet.",
    url: "https://sleep-test.org",
    tags: ["Helse", "Web"],
  },
  {
    title: "Brain Test",
    description: "Kognitiv test og hjernetrening på nett.",
    url: "https://brain-test.org",
    tags: ["Helse", "Web"],
  },
  {
    title: "Mindset Test",
    description: "Test og utvikle ditt tankesett.",
    url: "https://mindset-test.org",
    tags: ["Helse", "Web"],
  },
  {
    title: "Vita Test",
    description: "Helhetlig helsetest og livskvalitetsvurdering.",
    url: "https://vita-test.org",
    tags: ["Helse", "Web"],
  },
  {
    title: "PAC-RUN",
    description: "Løpeapp med gamification-elementer.",
    url: "https://pac.run",
    tags: ["App", "Spill"],
  },
  {
    title: "DadJokes Plus",
    description: "Homey-app som leverer pappa-vitser med stil.",
    url: "https://homey.app/a/com.dmzdata.dadjokesplus/",
    tags: ["Homey", "App"],
  },
  {
    title: "CAx6.6",
    description: "Homey-app for styring av CA-enheter.",
    url: "https://homey.app/a/com.dmzdata.cax66/",
    tags: ["Homey", "App"],
  },
];

const Projects = () => {
  return (
    <section id="prosjekter" className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Prosjekter</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Et utvalg av våre prosjekter og produkter.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group rounded-xl border border-border bg-card p-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-semibold text-lg mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="self-start gap-2 px-0 text-primary hover:text-primary/80">
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  Besøk <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
