import { ReactNode, useEffect, useState, FC } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Pill from "@/components/atoms/pill";
import { TypIconPill } from "@/lib/types";

type RotatePillElProps = { items: TypIconPill[] };
const RotatePillEl: FC<RotatePillElProps> = ({
  items,
}: RotatePillElProps): JSX.Element => {
  const [itemIndex, setItemIndex] = useState(0);
  useEffect(() => {
    const pillRotate = setTimeout(() => {
      let next = itemIndex + 1;
      setItemIndex(next % items.length);
    }, 2 * 1000);

    return () => {
      clearTimeout(pillRotate);
    };
  }, [itemIndex, items.length]);

  return (
    <AnimatePresence initial={true} mode="wait">
      <motion.span
        className="inline-flex gap-2 items-center justify-center py-2 rounded-md"
        key={itemIndex}
        initial={{ translateY: 10, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        exit={{ translateY: -10, opacity: 0 }}
        transition={{ ease: "easeOut", duration: 0.25 }}
      >
        <Pill src={items[itemIndex].src} size={25} rightIcon>
          {items[itemIndex].text}
        </Pill>
      </motion.span>
    </AnimatePresence>
  );
};

type HomeComponent = {
  className?: string;
  children: ReactNode;
};

export const Home = {
  container: ({ children }: HomeComponent): JSX.Element => <>{children}</>,
  h1: ({ children }: HomeComponent): JSX.Element => (
    <h1 className="contents uppercase text-red-300 font-bold text-5xl max-sm:text-2xl">
      {children}
    </h1>
  ),
  h2: ({ children }: HomeComponent): JSX.Element => (
    <h2 className="contents uppercase text-red-300 font-bold text-7xl max-sm:text-5xl">
      {children}
    </h2>
  ),
  h3: ({ children }: HomeComponent): JSX.Element => (
    <h3 className="text-2xl max-sm:text-xl text-stone-300 font-bold">
      {children}
    </h3>
  ),
  span: ({ className = "", children }: HomeComponent): JSX.Element => (
    <span className={className}>{children}</span>
  ),
  section: ({ className = "", children }: HomeComponent): JSX.Element => {
    const classNames = Array.from(
      new Set([
        "flex",
        "gap-4",
        "mt-8",
        "max-sm:flex-col",
        ...className.split(" "),
      ])
    ).join(" ");
    return <section className={classNames}>{children}</section>;
  },
  rotatePill: ({ items }: { items: TypIconPill[] }): JSX.Element => (
    <RotatePillEl items={items} />
  ),
};
