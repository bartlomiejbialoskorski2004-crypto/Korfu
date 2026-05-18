"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useLocale } from "@/lib/use-locale";
import {
  getMinuteSnapshot,
  getServerMinuteSnapshot,
  subscribeMinute,
} from "@/lib/client-stores";

const OPEN_METEO_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=39.62&longitude=19.92&current=temperature_2m,weather_code&timezone=Europe%2FAthens";

type WeatherKind = "clear" | "cloudy" | "rain" | "storm" | "snow" | "fog";

function classifyWeather(code: number | null): WeatherKind {
  if (code === null) return "clear";
  if (code === 0) return "clear";
  if (code >= 1 && code <= 3) return "cloudy";
  if (code >= 45 && code <= 48) return "fog";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if (code >= 71 && code <= 86) return "snow";
  if (code >= 95) return "storm";
  return "cloudy";
}

function formatAthensTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Athens",
  }).format(date);
}

export function CorfuLivePill() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const minute = useSyncExternalStore(
    subscribeMinute,
    getMinuteSnapshot,
    getServerMinuteSnapshot,
  );
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weather, setWeather] = useState<WeatherKind>("clear");

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await fetch(OPEN_METEO_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`Open-Meteo ${res.status}`);
        const data = (await res.json()) as {
          current?: { temperature_2m?: number; weather_code?: number };
        };
        const temp = data.current?.temperature_2m;
        const code = data.current?.weather_code;
        if (typeof temp === "number") setTemperature(Math.round(temp));
        setWeather(classifyWeather(typeof code === "number" ? code : null));
      } catch {
        // graceful fallback — pill shows only the time
      }
    };
    void load();
    const refresh = setInterval(load, 5 * 60_000);
    return () => {
      controller.abort();
      clearInterval(refresh);
    };
  }, []);

  const timeText =
    minute === null
      ? "—— : ——"
      : formatAthensTime(new Date(minute * 60_000));

  return (
    <div
      className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/70"
      aria-label="Live local conditions on Corfu"
    >
      <span className="tabular-nums">{timeText} EET</span>
      {temperature !== null && (
        <>
          <span aria-hidden className="text-cobalt">·</span>
          <span className="inline-flex items-center gap-1.5 tabular-nums">
            <motion.span
              aria-hidden
              className="inline-block w-1.5 h-1.5 rounded-full bg-cobalt"
              animate={reduced ? undefined : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            {temperature}°C
          </span>
          <span aria-hidden className="text-cobalt">·</span>
          <span>{t.weather[weather]}</span>
        </>
      )}
    </div>
  );
}
