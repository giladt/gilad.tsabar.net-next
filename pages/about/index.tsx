import Head from 'next/head';
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import About from '@/components/templates/about';
import { useI18n } from '@/contexts/i18nContext';
import { getMessages, resolveMessage } from '@/lib/i18n';
import { getFile } from '@/utils/files';
import { TypExperience, TypIconPill } from '@/lib/types/index';

interface RawExperience {
  id: string;
  company: string;
  begin: string;
  end: string;
  location: string;
}

interface LocalizedExperience {
  title: string;
  about?: string;
  tasks: string[];
}

interface PageProps {
  readonly skills: TypIconPill[];
  readonly experience: TypExperience[];
}

export default function AboutPage({
  skills,
  experience,
}: Readonly<InferGetStaticPropsType<typeof getStaticProps>>) {
  const { t } = useI18n();

  return (
    <>
      <Head>
        <title>{t('pages.aboutTitle')}</title>
      </Head>
      <About skills={skills} experience={experience} />
    </>
  );
}

const getLocalizedString = (
  messages: ReturnType<typeof getMessages>,
  key: string,
): string => {
  const value = resolveMessage(messages, key);
  return typeof value === 'string' ? value : '';
};

export const getStaticProps = (async ({ locale }: GetStaticPropsContext) => {
  const messages = getMessages(locale);
  const skillsData = await getFile('skills');
  const skills: TypIconPill[] = JSON.parse(skillsData);
  const experienceData = await getFile('experience');
  const experienceRaw: RawExperience[] = JSON.parse(experienceData);

  const experience: TypExperience[] = experienceRaw.map((item) => {
    const localized = resolveMessage(
      messages,
      `about.experience.${item.id}`,
    ) as LocalizedExperience | undefined;

    const end =
      item.end === 'present'
        ? getLocalizedString(messages, 'about.present')
        : item.end;
    const location = getLocalizedString(
      messages,
      `about.locations.${item.location}`,
    );

    return {
      title: localized?.title ?? '',
      company: item.company,
      begin: item.begin,
      end,
      location,
      about: localized?.about ?? '',
      tasks: localized?.tasks ?? [],
    };
  });

  return {
    props: {
      skills,
      experience,
    },
    revalidate: 1 * 60 * 60,
  };
}) satisfies GetStaticProps<PageProps>;
