import { FC } from "react";
import MiniMe from "../molecules/mini-me";
import { AnimatePresence, motion } from "framer-motion";
import { TypIconPill } from "@/lib/types";
import { Home } from "@/components/atoms/home-elements";
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

const HomePage: FC<HomeProps> = ({ skills }: HomeProps) => {
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
        <Home.container>
          <motion.ul
            className="flex flex-col pt-8 max-w-xl gap-2 w-full"
            key="temp"
            variants={container}
            initial="hidden"
            animate="show"
            layout
          >
            <motion.li variants={item}>
              <Home.span>
                Hey there, <br />
              </Home.span>
            </motion.li>
            <motion.li variants={item}>
              <Home.span className="text-3xl max-sm:text-xl">
                My name is <Home.h1>Gilad Tsabar</Home.h1>,
              </Home.span>
            </motion.li>
            <motion.li variants={item}>
              <Home.span className="text-5xl max-sm:text-2xl">
                I am a <Home.h2>Full Stack Web Developer</Home.h2> based in
                Berlin, Germany.
              </Home.span>
            </motion.li>
            <motion.li variants={item}>
              <Home.h3>
                Specialized in frontend development with over 4 years of
                experience in building the web and working with technologies
                like <Home.rotatePill items={skills} />
              </Home.h3>
            </motion.li>
            <motion.li variants={item}>
              <Home.section>
                <PageLink href="/about" about="More about me">
                  <FontAwesomeIcon icon={faSignHanging} /> Been there, Done that
                </PageLink>
                <PageLink href="/projects" about="Projects I've done">
                  <FontAwesomeIcon icon={faToolbox} /> Me, Showing off
                </PageLink>
                <PageLink href="/contact" about="Contact Me">
                  <FontAwesomeIcon icon={faPeopleGroup} /> Drop me a message
                </PageLink>
              </Home.section>
            </motion.li>
          </motion.ul>
        </Home.container>
      </AnimatePresence>
      <MiniMe className="max-sm:hidden max-xl:scale-75" />
    </motion.header>
  );
};
export default HomePage;
