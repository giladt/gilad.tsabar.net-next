import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

interface pageSectionProps {
  id: string;
  label: string;
  className?: string;
  children: ReactNode;
}

export const PageSection: FC<pageSectionProps> = ({
  id,
  label,
  className = "",
  children,
}: pageSectionProps) => (
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

interface pageSectionParagraphProps {
  children: ReactNode;
}

export const PageSectionParagraph: FC<pageSectionParagraphProps> = ({
  children,
}) => (
  <article
    className="flex flex-col gap-2
    max-w-[62rem] mb-8 w-full"
  >
    {children}
  </article>
);

interface pageSectionTilesProps {
  children: ReactNode;
}

export const PageSectionTiles: FC<pageSectionTilesProps> = ({ children }) => (
  <motion.article
    className="flex gap-2 flex-wrap grow 
      max-w-[62rem] mb-8 w-full justify-center
    "
  >
    {children}
  </motion.article>
);

interface pageSectionTitleProps {
  id?: string;
  small?: boolean;
  align?: "left" | "center" | "right";
  children: ReactNode;
}

export const PageSectionTitle: FC<pageSectionTitleProps> = ({
  id = uuidv4(),
  small = false,
  align = "center",
  children,
}: pageSectionTitleProps) => {
  const textAlignment = `text-${align}`;
  return (
    <h2
      id={id}
      className={`${small ? "text-lg" : "text-2xl"}
        mb-8 font-bold w-full ${textAlignment} text-slate-600
        ${
          align === "left"
            ? `hidden lg:visible text-8xl opacity-20
                left-0 p-0 mx-0 my-auto fixed top-0
                h-[100vh] w-[11rem] font-bold [writing-mode:vertical-rl]
                rotate-180 align-middle justify-center items-center
                lg:flex`
            : "text-2xl"
        }

      `}
    >
      {children}
    </h2>
  );
};

export default PageSectionTitle;
