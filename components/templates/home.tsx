import { FC } from "react";
import MiniMe from "../molecules/mini-me";
import { AnimatePresence, motion } from "framer-motion";
import { TypIconPill } from "@/lib/types";
import { HomeElements } from "@/components/atoms/home-elements";
import { PageLink } from "@/components/atoms/page-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faSignHanging,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";

interface HomeProps {
  skills: TypIconPill[];
}

const Home: FC<HomeProps> = ({ skills }: HomeProps) => {
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
    hidden: { opacity: 0, x: "20rem" },
    show: { opacity: 1, x: 0 },
  };
  return (
    <motion.header
      className="flex flex-row flex-wrap items-center justify-center 
      py-8 max-2xl:pl-12 max-2xl:pr-4
      w-full min-h-[100vh] relative gap-4
      bg-[#330867] bg-gradient-to-br 
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
                Hey there, <br />
              </HomeElements.Span>
            </motion.li>
            <motion.li variants={item}>
              <HomeElements.Span className="text-3xl max-sm:text-xl">
                My name is <HomeElements.H1>Gilad Tsabar</HomeElements.H1>,
              </HomeElements.Span>
            </motion.li>
            <motion.li variants={item}>
              <HomeElements.Span className="text-5xl max-sm:text-2xl">
                I am a <HomeElements.H2>Full Stack Web Developer</HomeElements.H2> based in
                Berlin, Germany.
              </HomeElements.Span>
            </motion.li>
            <motion.li variants={item}>
              <HomeElements.H3>
                Specialized in frontend development with over 4 years of
                experience in building the web and working with technologies
                like <HomeElements.RotatePill items={skills} />
              </HomeElements.H3>
            </motion.li>
            <motion.li variants={item}>
              <HomeElements.Section>
                <PageLink href="/about" about="More about me">
                  <FontAwesomeIcon icon={faSignHanging} /> Been there, Done that
                </PageLink>
                <PageLink href="/projects" about="Projects I've done">
                  <FontAwesomeIcon icon={faToolbox} /> Me, Showing off
                </PageLink>
                <PageLink href="/contact" about="Contact Me">
                  <FontAwesomeIcon icon={faPeopleGroup} /> Drop me a message
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
