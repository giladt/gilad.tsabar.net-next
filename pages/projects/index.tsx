import { TypProject } from '@/lib/types';
import ProjectsPage from '@/components/templates/projects';
import Head from 'next/head';
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useI18n } from '@/contexts/i18nContext';
import { getMessages, resolveMessage } from '@/lib/i18n';
import { getFile } from '@/utils/files';

interface PageProps {
  projects: TypProject[];
}

interface RawProject extends Omit<TypProject, 'title' | 'description'> {
  id: string;
}

/**
 * Projects Page.
 * @param props args: projects as ProjectProps[]. Contains the projects data
 * @returns JSX.Element
 */
export default function Projects({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useI18n();

  return (
    <>
      <Head>
        <title>{t('pages.projectsTitle')}</title>
      </Head>
      <ProjectsPage projects={projects} />
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
  const fileData = await getFile('projects');
  const rawProjects: RawProject[] = JSON.parse(await fileData);

  const projects: TypProject[] = rawProjects.map((project) => ({
    ...project,
    title: getLocalizedString(messages, `projects.items.${project.id}.title`),
    description: getLocalizedString(
      messages,
      `projects.items.${project.id}.description`,
    ),
  }));

  return {
    props: {
      projects,
    },
    revalidate: 1 * 60 * 60,
  };
}) satisfies GetStaticProps<PageProps>;
