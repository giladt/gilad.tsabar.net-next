import type { FC } from 'react';
import Image from 'next/image';

import { PageSection } from '@/components/atoms/page-section';
import VerticalTimeline from '@/components/organisms/verticalTimeline';
import Pill from '@/components/atoms/pill';
import { useI18n } from '@/contexts/i18nContext';
import type { TypExperience, TypIconPill } from '@/lib/types';

interface AboutProps {
  skills: TypIconPill[];
  experience: TypExperience[];
}

const About: FC<AboutProps> = ({ skills, experience }) => {
  const { t } = useI18n();

  return (
    <PageSection.Container
      label={t('about.sectionLabel')}
      className="bg-stone-200 text-black"
    >
      <PageSection.Title align="left">{t('about.title')}</PageSection.Title>
      <PageSection.Paragraph>
        <div className="flex flex-wrap justify-center gap-4 p-4 rounded-lg bg-stone-300 my-2">
          <div className="md:max-w-[calc(100%-250px-1rem)] min-w-[250px] flex flex-col gap-2">
            <h2 className="text-xl font-bold">{t('about.whoAmI')}</h2>
            <p className="font-semibold">{t('about.introParagraph')}</p>
            <p className="font-semibold">{t('about.hobbiesParagraph')}</p>
          </div>
          <Image
            className="rounded-lg shadow-lg aspect-square"
            src="/portrait.png"
            width={250}
            height={250}
            alt={t('about.portraitAlt')}
          />
        </div>
        <div>
          <h2 className="text-1xl font-bold pt-4">
            {t('about.technologiesTitle')}
          </h2>
          <ul className="flex flex-wrap justify-left gap-4 py-4">
            {skills.map((skill, index) => (
              <Pill key={index} src={skill.src} size={30}>
                {skill.text}
              </Pill>
            ))}
          </ul>
        </div>
        <PageSection.Title>{t('about.experienceTitle')}</PageSection.Title>
        <VerticalTimeline experience={experience} />
      </PageSection.Paragraph>
    </PageSection.Container>
  );
};
export default About;
