import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Pill from "@/components/atoms/pill";
import { TypIconPill } from "@/lib/types";

export const Home = {
  container: ({ children }: { children: ReactNode }): JSX.Element => (
    <div className="flex flex-col pt-8 max-w-4xl max-sm:pl-12 max-sm:pr-4 gap-2 w-full">
      {children}
    </div>
  ),
  h1: ({ children }: { children: ReactNode }): JSX.Element => (
    <h1 className="contents uppercase text-red-300 font-bold text-5xl max-sm:text-2xl">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }): JSX.Element => (
    <h2 className="contents uppercase text-red-300 font-bold text-7xl max-sm:text-5xl">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }): JSX.Element => (
    <h3 className="text-2xl max-sm:text-xl text-stone-300 font-bold">
      {children}
    </h3>
  ),
  rotatePill: ({ items }: { items: TypIconPill[] }): JSX.Element => {
    const [itemIndex, setItemIndex] = useState(0);
    useEffect(() => {
      const pillRotate = setTimeout(() => {
        let next = itemIndex + 1;
        setItemIndex(next % items.length);
      }, 2 * 1000);

      return () => {
        clearTimeout(pillRotate);
      };
    }, [itemIndex]);

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
  },
};
