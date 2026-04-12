import { Users, HeartPulse, Home, Cpu, Lightbulb, Code } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Konsulenttjenester",
    description: "Rådgivning og prosjektledelse innen IT og teknologi.",
    span: "md:col-span-2",
  },
  {
    icon: HeartPulse,
    title: "Helse Tech",
    description: "Utvikling av digitale helseløsninger og verktøy for helsesektoren.",
    span: "",
  },
  {
    icon: Home,
    title: "KNX & Homey",
    description: "Smarthus-integrasjoner med KNX og Homey-plattformen.",
    span: "",
  },
  {
    icon: Cpu,
    title: "Smarthus",
    description: "Helhetlige smarthus-løsninger for bolig og næring.",
    span: "",
  },
  {
    icon: Lightbulb,
    title: "Konsept & Produktutvikling",
    description: "Fra idé til ferdig produkt — design, prototyping og lansering.",
    span: "",
  },
  {
    icon: Code,
    title: "App- og nettutvikling",
    description: "Moderne apper og nettsider med fokus på brukeropplevelse.",
    span: "md:col-span-2",
  },
];

const Services = () => {
  return (
    <section id="tjenester" className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Tjenester</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Vi tilbyr et bredt spekter av tjenester innen teknologi og utvikling.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {services.map((s) => (
            <div
              key={s.title}
              className={`group rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${s.span}`}
            >
              <s.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
