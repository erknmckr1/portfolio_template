import tr from "@/app/lib/locales/tr.json";
import en from "@/app/lib/locales/en.json";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

type TranslationValue =
  | string
  | TranslationObject
  | TranslationArray
  | number
  | boolean;
type TranslationObject = { [key: string]: TranslationValue }; // json içindeki nesnet object olabilir
type TranslationArray = Array<TranslationValue>; // json içinde bir array olabilir.

export function useTranslation() {
  const { language } = useSelector((state: RootState) => state.language);
  const locales: Record<string, TranslationObject> = {
    tr,
    en
  };
  const translations = locales[language];

  // t fonkisyonu varsayılan olarak string dönsün ama farklı degerlerde dönebilir. generic type
  const t = <T = string>(path: string): T => {
    const result = path
      .split(".")
      .reduce<TranslationValue | undefined>((acc, key) => {
        // type narrowing
        if (acc && typeof acc === "object" && !Array.isArray(acc)) {
          return (acc as TranslationObject)[key];
        }
        return undefined;
      }, translations as TranslationValue);

    // Eğer sonuç bulunamazsa path'i döndür
    return (result ?? path) as T;
  };

  return { t, language };
}
