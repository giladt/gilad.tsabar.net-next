import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type FC,
  type PropsWithChildren,
} from 'react';
import { useRouter } from 'next/router';

import {
  getLocale,
  getMessages,
  resolveMessage,
  type LocaleMessages,
  type SupportedLocale,
} from '@/lib/i18n';

interface I18nContextValue {
  locale: SupportedLocale;
  messages: LocaleMessages;
  t: (key: string) => string;
  getMessage: <T>(key: string) => T;
  switchLocale: (locale: SupportedLocale) => void;
}

const defaultLocale = getLocale('en');
const defaultMessages = getMessages(defaultLocale);

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  messages: defaultMessages,
  t: (key: string) => key,
  getMessage: <T,>(_key: string) => undefined as T,
  switchLocale: () => undefined,
});

export const I18nProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const locale = getLocale(router.locale);
  const messages = useMemo(() => getMessages(locale), [locale]);

  const t = useCallback(
    (key: string): string => {
      const value = resolveMessage(messages, key);
      return typeof value === 'string' ? value : key;
    },
    [messages],
  );

  const getMessage = useCallback(
    <T,>(key: string): T => {
      return resolveMessage(messages, key) as T;
    },
    [messages],
  );

  const switchLocale = useCallback(
    (nextLocale: SupportedLocale): void => {
      if (nextLocale === locale) {
        return;
      }

      void router.push(router.asPath, router.asPath, {
        locale: nextLocale,
        scroll: false,
      });
    },
    [locale, router],
  );

  return (
    <I18nContext.Provider
      value={{ locale, messages, t, getMessage, switchLocale }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextValue => {
  return useContext(I18nContext);
};
