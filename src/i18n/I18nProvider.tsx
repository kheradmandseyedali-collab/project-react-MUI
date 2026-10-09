import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Language } from "./translations";

type TranslationTree = typeof translations.en;
type I18nContextValue = {
  t: (key: string) => string;
  lang: Language;
  setLang: (lang: Language) => void;
  dir: "rtl" | "ltr";
};
const I18nContext = createContext<I18nContextValue | null>(null);
function getInitialLanguage(): Language {
  try {
    return localStorage.getItem("nova-language") === "fa" ? "fa" : "en";
  } catch {
    return "en";
  }
}
function lookup(tree: TranslationTree, key: string): string {
  const result = key
    .split(".")
    .reduce<unknown>(
      (node, part) =>
        node && typeof node === "object"
          ? (node as Record<string, unknown>)[part]
          : undefined,
      tree,
    );
  return typeof result === "string" ? result : key;
}
export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const dir = lang === "fa" ? "rtl" : "ltr";
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("nova-language", lang);
    } catch {
      /* storage can be unavailable */
    }
  }, [dir, lang]);
  const t = useCallback(
    (key: string) =>
      lookup(translations[lang] as unknown as TranslationTree, key),
    [lang],
  );
  const value = useMemo(() => ({ t, lang, setLang, dir }), [t, lang, dir]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used within I18nProvider");
  return value;
}
