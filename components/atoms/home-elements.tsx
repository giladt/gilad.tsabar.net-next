import { ReactNode, useEffect, useState, FC, JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Pill from "@/components/atoms/pill";
import { TypIconPill } from "@/lib/types";

type RotatePillElProps = { items: TypIconPill[] };
const RotatePillEl: FC<RotatePillElProps> = ({
  items,
}: RotatePillElProps) => {
  const [itemIndex, setItemIndex] = useState(0);
  useEffect(() => {
    const pillRotate = setTimeout(() => {
      const next = itemIndex + 1;
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

export const HomeElements = {
  Container: ({ children }: HomeComponent): JSX.Element => <>{children}</>,
  H1: ({ children }: HomeComponent): JSX.Element => (
    <h1 className="contents uppercase text-red-300 font-bold text-5xl max-sm:text-2xl">
      {children}
    </h1>
  ),
  H2: ({ children }: HomeComponent): JSX.Element => (
    <h2 className="contents uppercase text-red-300 font-bold text-7xl max-sm:text-5xl">
      {children}
    </h2>
  ),
  H3: ({ children }: HomeComponent): JSX.Element => (
    <h3 className="text-2xl max-sm:text-xl text-stone-300 font-bold">
      {children}
    </h3>
  ),
  Span: ({ className = "", children }: HomeComponent): JSX.Element => (
    <span className={className}>{children}</span>
  ),
  Section: ({ className = "", children }: HomeComponent): JSX.Element => {
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
  RotatePill: ({ items }: { items: TypIconPill[] }): JSX.Element => (
    <RotatePillEl items={items} />
  ),
};
