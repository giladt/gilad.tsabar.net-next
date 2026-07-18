import ContactMePage from '@/components/templates/contact';
import Head from 'next/head';
import { useI18n } from '@/contexts/i18nContext';

type PageProps = {};

export default function Contact() {
  const { t } = useI18n();

  return (
    <>
      <Head>
        <title>{t('pages.contactTitle')}</title>
      </Head>

      <ContactMePage />
    </>
  );
}
