import { FC } from 'react';
import MiniMe from '../molecules/mini-me';
import { AnimatePresence, motion } from 'framer-motion';
import { TypIconPill } from '@/lib/types';
import { useI18n } from '@/contexts/i18nContext';
import { HomeElements } from '@/components/atoms/home-elements';
import { PageLink } from '@/components/atoms/page-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPeopleGroup,
  faSignHanging,
  faToolbox,
} from '@fortawesome/free-solid-svg-icons';

interface HomeProps {
  skills: TypIconPill[];
}

const Home: FC<HomeProps> = ({ skills }: HomeProps) => {
  const { t } = useI18n();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, x: '20rem' },
    show: { opacity: 1, x: 0 },
  };
  return (
    <motion.header
      className="flex flex-row flex-wrap items-center justify-center 
      py-8 max-2xl:pl-12 max-2xl:pr-4
      w-full min-h-screen relative gap-4
      bg-[#330867] bg-linear-to-br 
      from-[#330867] to-[#880110] from-50% to-100%
      before:content-[''] before:absolute
      before:top-0 before:left-0
      before:w-full before:h-full
      before:bg-[url('/background-header.jpg')]
      before:bg-center before:bg-cover
      before:opacity-10
      text-white overflow-hidden"
    >
      <AnimatePresence initial={true}>
        <HomeElements.Container>
          <motion.ul
            className="flex flex-col pt-8 max-w-xl gap-2 w-full"
            key="temp"
            variants={container}
            initial="hidden"
            animate="show"
            layout
          >
            <motion.li variants={item}>
              <HomeElements.Span>
                {t('home.greeting')} <br />
              </HomeElements.Span>
            </motion.li>
            <motion.li variants={item}>
              <HomeElements.Span className="text-3xl max-sm:text-xl">
                {t('home.namePrefix')}{' '}
                <HomeElements.H1>{t('home.name')}</HomeElements.H1>,
              </HomeElements.Span>
            </motion.li>
            <motion.li variants={item}>
              <HomeElements.Span className="text-5xl max-sm:text-2xl">
                {t('home.headlinePrefix')}{' '}
                <HomeElements.H2>{t('home.headline')}</HomeElements.H2>{' '}
                {t('home.headlineSuffix')}
              </HomeElements.Span>
            </motion.li>
            <motion.li variants={item}>
              <HomeElements.H3>
                {t('home.specialization')}{' '}
                <HomeElements.RotatePill items={skills} />
              </HomeElements.H3>
            </motion.li>
            <motion.li variants={item}>
              <HomeElements.Section>
                <PageLink href="/about" about={t('home.aboutLinkAbout')}>
                  <FontAwesomeIcon icon={faSignHanging} />{' '}
                  {t('home.aboutLinkLabel')}
                </PageLink>
                <PageLink href="/projects" about={t('home.projectsLinkAbout')}>
                  <FontAwesomeIcon icon={faToolbox} />{' '}
                  {t('home.projectsLinkLabel')}
                </PageLink>
                <PageLink href="/contact" about={t('home.contactLinkAbout')}>
                  <FontAwesomeIcon icon={faPeopleGroup} />{' '}
                  {t('home.contactLinkLabel')}
                </PageLink>
              </HomeElements.Section>
            </motion.li>
          </motion.ul>
        </HomeElements.Container>
      </AnimatePresence>
      <MiniMe className="max-sm:hidden max-xl:scale-75" />
    </motion.header>
  );
};
export default Home;
