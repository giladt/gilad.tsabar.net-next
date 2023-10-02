import { FC, useContext } from "react";
import MiniMe from "../molecules/mini-me";
import { motion, useMotionValue } from "framer-motion";
import { WindowContext } from "@/contexts/windowContext";
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
  const { clientWidth, clientHeight } = useContext(WindowContext);

  const x = useMotionValue(clientWidth);
  const y = useMotionValue(clientHeight);

  function handleMouse(event: React.MouseEvent) {
    x.set(event.clientX);
    y.set(event.clientY);
  }

  return (
    <motion.header
      onMouseMove={handleMouse}
      className="flex flex-row flex-wrap items-center justify-center 
      max-2xl:pl-16 max-2xl:pr-4
      w-full min-h-[100vh] relative gap-4
      bg-[#330867] bg-gradient-to-br 
      from-[#330867] to-[#880110] from-50% to-100%
      before:content-[''] before:absolute
      before:top-0 before:left-0
      before:w-full before:h-full
      before:bg-[url('/background-header.jpg')]
      before:bg-center before:bg-cover
      before:opacity-10
      text-white"
    >
      <Home.container>
        <Home.span className="text-2xl max-sm:text-lg">
          Hey there, <br />
        </Home.span>
        <Home.span className="text-3xl max-sm:text-xl">
          My name is <Home.h1>Gilad Tsabar</Home.h1>,
        </Home.span>
        <Home.span className="text-5xl max-sm:text-2xl">
          I am a <Home.h2>Full Stack Web Developer</Home.h2> based in Berlin,
          Germany.
        </Home.span>
        <Home.h3>
          Specialized in frontend development with over 4 years of experience in
          building the web and working with technologies like{" "}
          <Home.rotatePill items={skills} />
        </Home.h3>
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
      </Home.container>
      <MiniMe x={x} y={y} className="max-sm:hidden" />
    </motion.header>
  );
};
export default HomePage;
