import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import { IntlProvider } from "react-intl";

import en from "./messages/en.json";
import ja from "./messages/ja.json";
import es from "./messages/es.json";
import fr from "./messages/fr.json";

export type SupportedLocale = "en" | "ja" | "es" | "fr";

const messagesMap: Record<SupportedLocale, Record<string, string>> = { en, ja, es, fr };

export const localeLabels: { code: SupportedLocale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

interface LocaleContextValue {
  locale: SupportedLocale;
  setLocale: (l: SupportedLocale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({ locale: "en", setLocale: () => {} });

export const useLocale = () => useContext(LocaleContext);

function detectLocale(): SupportedLocale {
  const stored = localStorage.getItem("otomeshon-locale") as SupportedLocale | null;
  if (stored && messagesMap[stored]) return stored;
  const nav = navigator.language.split("-")[0] as SupportedLocale;
  return messagesMap[nav] ? nav : "en";
}

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(detectLocale);

  const setLocale = useCallback((l: SupportedLocale) => {
    setLocaleState(l);
    localStorage.setItem("otomeshon-locale", l);
  }, []);

  const ctx = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LocaleContext.Provider value={ctx}>
      <IntlProvider locale={locale} messages={messagesMap[locale]} defaultLocale="en">
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
