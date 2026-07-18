import en from '@/lib/locales/en.json';
import de from '@/lib/locales/de.json';

export const SUPPORTED_LOCALES = ['en', 'de'] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type LocaleMessages = typeof en;

const dictionaries: Record<SupportedLocale, LocaleMessages> = {
  en,
  de,
};

export const getLocale = (locale?: string): SupportedLocale => {
  if (locale === 'de') {
    return 'de';
  }

  return 'en';
};

export const getMessages = (locale?: string): LocaleMessages =>
  dictionaries[getLocale(locale)];

export const resolveMessage = (
  messages: LocaleMessages,
  key: string,
): unknown => {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }

    return undefined;
  }, messages);
};
