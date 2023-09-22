import { FC, useContext, useEffect, useState } from "react";
import Pill from "@/components/atoms/pill";
import MiniMe from "../molecules/miniMe";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { WindowContext } from "@/contexts/windowContext";
import { TypIconPill } from "@/lib/types";
import { Home } from "@/components/atoms/home-elements";

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

  const [pillIndex, setPillIndex] = useState(0);
  useEffect(() => {
    const pillRotate = setTimeout(() => {
      let next = pillIndex + 1;
      setPillIndex(next % skills.length);
    }, 2 * 1000);

    return () => {
      clearTimeout(pillRotate);
    };
  }, [pillIndex]);

  return (
    <motion.header
      onMouseMove={handleMouse}
      id="home"
      className="flex flex-row flex-wrap items-center justify-center 
                  w-full min-h-[100vh] relative gap-4
                  bg-[#330867] bg-gradient-to-br 
                  from-[#330867] to-[#880110] from-50% to-100%
                  before:content-[''] before:absolute
                  before:top-0 before:left-0
                  before:w-full before:h-full
                  before:bg-[url('/background-header.jpg')]
                  before:bg-center before:bg-cover
                  before:opacity-10
                  text-start
                "
    >
      <div className="flex flex-col">
        <div
          className="relative max-w-4xl px-4 w-full
                text-2xl max-sm:text-lg text-white font-bold
                drop-shadow-[0_0_3rem_rgba(255,255,255,0.25),0_0_1rem_rgba(255,255,255,0.5)] 
              "
        >
          Hey there, <br />
        </div>
        <div
          className="relative max-w-4xl px-4 w-full
                text-3xl max-sm:text-xl text-white font-bold
                drop-shadow-[0_0_3rem_rgba(255,255,255,0.25),0_0_1rem_rgba(255,255,255,0.5)] 
              "
        >
          My name is{" "}
          <strong className="uppercase text-5xl max-sm:text-2xl text-red-300">
            Gilad Tsabar
          </strong>
          ,
        </div>

        <h1
          className="relative max-w-4xl px-4
                text-5xl max-sm:text-2xl text-white
                drop-shadow-[0_0_3rem_rgba(255,255,255,0.25),0_0_1rem_rgba(255,255,255,0.5)] 
              "
        >
          I am a{" "}
          <strong className="text-7xl max-sm:text-5xl uppercase text-red-300">
            Full Stack Web Developer
          </strong>{" "}
          based in Berlin, Germany.
        </h1>
        <h2
          className="relative max-w-4xl px-4 pt-4
                text-2xl max-sm:text-xl text-stone-300 font-bold
                drop-shadow-[0_0_3rem_rgba(255,255,255,0.25),0_0_1rem_rgba(255,255,255,0.5)] 
              "
        >
          Specialized in frontend development with over 3 years of experience in
          building the web and working with technologies like{" "}
          <AnimatePresence initial={true} mode="wait">
            <motion.span
              className="inline-flex gap-2 items-center justify-center py-2 rounded-md"
              key={pillIndex}
              initial={{ translateY: 10, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: -10, opacity: 0 }}
              transition={{ ease: "easeOut", duration: 0.25 }}
            >
              <Pill src={skills[pillIndex].src} size={25} rightIcon>
                {skills[pillIndex].text}
              </Pill>
            </motion.span>
          </AnimatePresence>
        </h2>
      </div>
      <MiniMe x={x} y={y} />
    </motion.header>
  );
};
export default HomePage;
