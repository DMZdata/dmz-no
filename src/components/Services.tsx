import { Users, HeartPulse, Home, Cpu, Shield, Wifi } from "lucide-react";

const services = [
  { icon: Users, title: "Konsulenttjenester", text: "Tradisjonelle IT konsulenttjenester." },
  { icon: HeartPulse, title: "Helse tech", text: "Rådgivning om bruk av teknologi i helse." },
  { icon: Home, title: "KNX & Homey", text: "KNX-programmering eller Homey magi til bolig og mindre næring." },
  { icon: Cpu, title: "Smarthus", text: "Generell rådgivning innen smarthusteknologi uten at det koster skjorta." },
  { icon: Wifi, title: "Nettverk og sikkerhet", text: "Er nettverket ditt sikkert nok? Vi kan gi gode råd." },
  { icon: Shield, title: "Enkel sikkerhetstesting", text: "Vi kan utføre enkle sikkerhets- og sårbarhetstester." },
];

const Services = () => {
  return (
    <section id="tjenester" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Left sticky label */}
          <div className="md:w-1/3 md:sticky md:top-32 md:self-start">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Tjenester</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
              Noen av områdene vi kan bistå med
            </h2>
          </div>

          {/* Right service list */}
          <div className="md:w-2/3 space-y-0">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="group flex items-start gap-5 py-8 border-b border-border last:border-b-0 hover:pl-2 transition-all duration-300"
              >
                <span className="text-muted-foreground/40 text-xs font-mono mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <s.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
