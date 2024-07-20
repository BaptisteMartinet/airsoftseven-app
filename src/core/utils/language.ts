import { Language } from "@core/api/types";
import { reverseMap } from "@core/utils/map";

export const DefaultLocal = "fr";
export const DefaultLanguage = Language.French;

const LocalPerLanguage = new Map([
  [Language.French, "fr"],
  [Language.English, "en"],
]);
const LanguagePerLocal = reverseMap(LocalPerLanguage);

const Locals = new Set(LanguagePerLocal.keys());

export function getLocalLanguage(local: string) {
  const language = LanguagePerLocal.get(local);
  if (!language) return null;
  return language;
}

export function ensureLocalLanguage(local: string) {
  const language = getLocalLanguage(local);
  if (!language) throw new Error(`Unsupported local: ${local}`);
  return language;
}

export function isSupportedLocal(local: string) {
  return Locals.has(local);
}

export function genTextsGetter<DefinitionT>(
  definitions: Map<Language, DefinitionT>
) {
  return (language: Language) => {
    const texts = definitions.get(language);
    if (!texts) throw new Error(`Unsupported language: ${language}`);
    return texts;
  };
}
