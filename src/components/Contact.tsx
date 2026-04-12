import { MapPin, Building2, ExternalLink, Shield } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [privacyLang, setPrivacyLang] = useState<"no" | "en">("no");

  return (
    <section id="kontakt" className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Om oss & Kontakt</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Vi har levert teknologiløsninger siden 2001.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Firmainformasjon */}
          <div className="rounded-xl border border-border bg-card p-6">
            <Building2 className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-3">Firmainformasjon</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><span className="text-foreground font-medium">Firma:</span> DMZ DATA AS</p>
              <p><span className="text-foreground font-medium">Stiftet:</span> 2001</p>
              <p><span className="text-foreground font-medium">Org.nr:</span> 984 433 608</p>
              <p className="flex items-start gap-1">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                Sandbrekkveien 66, 3949 Porsgrunn
              </p>
              <a
                href="https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=984433608"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline mt-2"
              >
                Se i Brønnøysundregistrene <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Personvern */}
          <div className="rounded-xl border border-border bg-card p-6">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-3">Personvern</h3>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => { setPrivacyLang("no"); setShowPrivacy(true); }}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${privacyLang === "no" && showPrivacy ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                Norsk
              </button>
              <button
                onClick={() => { setPrivacyLang("en"); setShowPrivacy(true); }}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${privacyLang === "en" && showPrivacy ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                English
              </button>
            </div>
            {showPrivacy && (
              <div className="text-sm text-muted-foreground space-y-2">
                {privacyLang === "no" ? (
                  <>
                    <p>Vi samler ikke inn personopplysninger utover det som er nødvendig for å levere våre tjenester.</p>
                    <p>Vi bruker informasjonskapsler for grunnleggende funksjonalitet. Ingen data deles med tredjeparter uten samtykke.</p>
                    <p>Kontakt oss for spørsmål om personvern.</p>
                  </>
                ) : (
                  <>
                    <p>We do not collect personal data beyond what is necessary to deliver our services.</p>
                    <p>We use cookies for basic functionality. No data is shared with third parties without consent.</p>
                    <p>Contact us for privacy inquiries.</p>
                  </>
                )}
              </div>
            )}
            {!showPrivacy && (
              <p className="text-sm text-muted-foreground">Klikk på et språk for å lese vår personvernerklæring.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
