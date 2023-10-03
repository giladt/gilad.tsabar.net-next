import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type TypTransitionVariants =
  | "vertical"
  | "vertical-exit"
  | "horizontal"
  | "horizontal-exit";

type PageTransitionProps = {
  dir: TypTransitionVariants;
  id: string;
} & HTMLMotionProps<"div">;
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>;

function PageTransition(
  { id, dir, children, ...rest }: PageTransitionProps,
  ref: PageTransitionRef
) {
  const variants = {
    vertical: {
      start: { scaleY: 0 },
      animate: { scaleY: 0 },
      end: { scaleY: 1.05 },
    },
    "vertical-exit": {
      start: { scaleY: 1.05 },
      animate: { scaleY: 0 },
      end: { scaleY: 0 },
    },
    horizontal: {
      start: { scaleX: 0 },
      animate: { scaleX: 0 },
      end: { scaleX: 1.05 },
    },
    "horizontal-exit": {
      start: { scaleX: 1.05 },
      animate: { scaleX: 0 },
      end: { scaleX: 0 },
    },
  };

  const transition = { duration: 0.4, ease: "easeInOut" };
  const origin =
    dir === "vertical" || dir === "vertical-exit"
      ? "origin-top"
      : "origin-right";

  return (
    <motion.div
      key={id}
      ref={ref}
      className={`absolute top-0 left-0 w-full h-[100vh] bg-stone-500 ${origin}`}
      initial={variants[dir].start}
      animate={variants[dir].animate}
      exit={variants[dir].end}
      transition={transition}
    />
  );
}

export default forwardRef(PageTransition);
