import { useEffect, useState } from "react";

type Place = { name: string; lat: number; lon: number; href?: string };

type Series = {
  time: string;
  data: {
    instant: { details: { air_temperature?: number } };
    next_6_hours?: {
      summary?: { symbol_code?: string };
      details?: { precipitation_amount?: number };
    };
    next_1_hours?: {
      summary?: { symbol_code?: string };
      details?: { precipitation_amount?: number };
    };
  };
};

type DaySummary = {
  label: string;
  symbol: string;
  tMin: number;
  tMax: number;
  precip: number;
};

const places: Place[] = [
  {
    name: "Linneslia",
    lat: 59.7509,
    lon: 10.2958,
    href: "https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-73607/Norge/Buskerud/Lier/Lier",
  },
  {
    name: "Ramnskollen",
    lat: 58.968,
    lon: 9.955,
    href: "https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2297285/Norge/Vestfold/Larvik/Stavern",
  },
  {
    name: "Smådølvegen",
    lat: 60.28,
    lon: 8.889,
    href: "https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-73245/Norge/Buskerud/Nore%20og%20Uvdal/Uvdal",
  },
];

// Map met.no symbol_code (without _day/_night/_polartwilight) to emoji.
const symbolEmoji = (code?: string): string => {
  if (!code) return "·";
  const base = code.replace(/_(day|night|polartwilight)$/, "");
  const map: Record<string, string> = {
    clearsky: "☀️",
    fair: "🌤️",
    partlycloudy: "⛅",
    cloudy: "☁️",
    fog: "🌫️",
    lightrainshowers: "🌦️",
    rainshowers: "🌦️",
    heavyrainshowers: "🌧️",
    lightrain: "🌦️",
    rain: "🌧️",
    heavyrain: "🌧️",
    lightsleet: "🌨️",
    sleet: "🌨️",
    heavysleet: "🌨️",
    lightsnow: "🌨️",
    snow: "❄️",
    heavysnow: "❄️",
    lightsnowshowers: "🌨️",
    snowshowers: "🌨️",
    heavysnowshowers: "❄️",
    thunder: "⛈️",
    rainandthunder: "⛈️",
    heavyrainandthunder: "⛈️",
    sleetandthunder: "⛈️",
    snowandthunder: "⛈️",
  };
  return map[base] ?? "·";
};

const summarize = (series: Series[], dayOffset: number, label: string): DaySummary | null => {
  const target = new Date();
  target.setHours(0, 0, 0, 0);
  target.setDate(target.getDate() + dayOffset);
  const y = target.getFullYear();
  const m = String(target.getMonth() + 1).padStart(2, "0");
  const d = String(target.getDate()).padStart(2, "0");
  const dayStr = `${y}-${m}-${d}`;

  // Match against local date derived from the UTC timestamp
  const today = series.filter((s) => {
    const dt = new Date(s.time);
    const ly = dt.getFullYear();
    const lm = String(dt.getMonth() + 1).padStart(2, "0");
    const ld = String(dt.getDate()).padStart(2, "0");
    return `${ly}-${lm}-${ld}` === dayStr;
  });
  if (today.length === 0) return null;

  const temps = today
    .map((s) => s.data.instant.details.air_temperature)
    .filter((v): v is number => typeof v === "number");
  if (temps.length === 0) return null;

  const tMin = Math.min(...temps);
  const tMax = Math.max(...temps);

  const precip = today.reduce((acc, s) => {
    const p =
      s.data.next_6_hours?.details?.precipitation_amount ??
      s.data.next_1_hours?.details?.precipitation_amount ??
      0;
    return acc + p;
  }, 0);

  // pick symbol closest to midday
  const noonEntry =
    today.find((s) => s.time.includes("T12:")) ??
    today.find((s) => s.time.includes("T13:")) ??
    today[Math.floor(today.length / 2)];
  const symbol = symbolEmoji(
    noonEntry.data.next_6_hours?.summary?.symbol_code ??
      noonEntry.data.next_1_hours?.summary?.symbol_code,
  );

  return { label, symbol, tMin: Math.round(tMin), tMax: Math.round(tMax), precip };
};

type PlaceForecast = { place: Place; today: DaySummary | null; tomorrow: DaySummary | null };

const WeatherCard = ({ pf }: { pf: PlaceForecast }) => {
  const row = (d: DaySummary | null) =>
    d ? (
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground w-16 shrink-0">{d.label}</span>
        <span className="text-base leading-none" aria-hidden>
          {d.symbol}
        </span>
        <span className="font-medium tabular-nums">
          {d.tMin}° / {d.tMax}°
        </span>
        <span className="text-muted-foreground tabular-nums w-12 text-right">
          {d.precip > 0 ? `${d.precip.toFixed(1)}mm` : "—"}
        </span>
      </div>
    ) : (
      <div className="text-sm text-muted-foreground">—</div>
    );

  return (
    <a
      href={pf.place.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-card/60 backdrop-blur-sm border border-border rounded-lg p-3 hover:border-foreground/40 transition-colors"
    >
      <div className="font-heading text-sm font-bold tracking-tight mb-2">{pf.place.name}</div>
      <div className="space-y-1">
        {row(pf.today)}
        {row(pf.tomorrow)}
      </div>
    </a>
  );
};

const WeatherWidget = () => {
  const [data, setData] = useState<PlaceForecast[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const results = await Promise.all(
          places.map(async (p) => {
            const res = await fetch(
              `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${p.lat}&lon=${p.lon}`,
            );
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            const series: Series[] = json.properties?.timeseries ?? [];
            return {
              place: p,
              today: summarize(series, 0, "I dag"),
              tomorrow: summarize(series, 1, "I morgen"),
            } satisfies PlaceForecast;
          }),
        );
        if (!cancelled) setData(results);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Feil");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <aside aria-label="Værvarsel" className="flex flex-col gap-3">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Vær</div>
      {error && <div className="text-sm text-muted-foreground">Kunne ikke laste vær.</div>}
      {!error && !data && (
        <div className="space-y-3">
          {places.map((p) => (
            <div
              key={p.name}
              className="bg-card/40 border border-border rounded-lg p-3 h-[76px] animate-pulse"
            />
          ))}
        </div>
      )}
      {data && (
        <div className="space-y-3">
          {data.map((pf) => (
            <WeatherCard key={pf.place.name} pf={pf} />
          ))}
        </div>
      )}
    </aside>
  );
};

export default WeatherWidget;
