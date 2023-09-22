import { FC } from "react";
import { motion } from "framer-motion";

import type {
  TypPageSection,
  TypPageSectionParagraph,
  TypPageSectionTiles,
  TypPageSectionTitle,
} from "@/lib/types/page-section";

/**
 *
 * @param label  string
 * @param className string
 * @param children React.ReactNode
 * @returns React.FC<TypPageSection>
 */
const Container: FC<TypPageSection> = ({
  label,
  className = "",
  children,
}: TypPageSection) => (
  <section
    aria-labelledby={label}
    className={`${className}
    flex flex-col justify-center items-center
    min-h-[100vh] py-6 pl-12 pr-4 md:px-20 lg:px-40
  `}
  >
    {children}
  </section>
);

const Paragraph: FC<TypPageSectionParagraph> = ({ children }) => (
  <article
    className="flex flex-col gap-2
    max-w-[62rem] mb-8 w-full"
  >
    {children}
  </article>
);

const Tiles: FC<TypPageSectionTiles> = ({ children }) => (
  <motion.article
    className="flex gap-2 flex-wrap grow 
      max-w-[62rem] mb-8 w-full justify-center
    "
  >
    {children}
  </motion.article>
);

const Title: FC<TypPageSectionTitle> = ({
  small = false,
  align = "center",
  children,
}: TypPageSectionTitle) => {
  const textAlignment = `text-${align}`;
  return (
    <h2
      className={`${small ? "text-lg" : "text-2xl"}
        mb-8 font-bold ${textAlignment} text-slate-600
        ${
          align === "left"
            ? `hidden lg:visible text-8xl opacity-30
                left-0 p-0 mx-0 my-auto fixed top-0 capitalize
                h-[100vh] w-[11rem] font-bold [writing-mode:vertical-rl]
                rotate-180 align-middle justify-center items-center
                lg:flex  drop-shadow-[-3px_-3px_6px_rgba(0,_0,_0,_0.75)] `
            : "text-2xl w-full"
        }

      `}
    >
      {children}
    </h2>
  );
};

export const PageSection = {
  Container,
  Title,
  Paragraph,
  Tiles,
};
