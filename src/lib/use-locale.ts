"use client";

import { useSyncExternalStore } from "react";
import { dictionary, type Dictionary, type Locale } from "./i18n";

const STORAGE_KEY = "korfu.locale";

let currentLocale: Locale = "pl";
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Locale {
  return currentLocale;
}

function getServerSnapshot(): Locale {
  return "pl";
}

export function setLocale(next: Locale) {
  if (next === currentLocale) return;
  currentLocale = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore quota / privacy mode failures
    }
  }
  notify();
}

export function hydrateLocaleFromStorage() {
  if (typeof window === "undefined") return;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "pl" || stored === "en") {
      setLocale(stored);
    }
  } catch {
    // ignore
  }
}

export function useLocale(): {
  locale: Locale;
  t: Dictionary;
  setLocale: (next: Locale) => void;
} {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { locale, t: dictionary[locale], setLocale };
}
