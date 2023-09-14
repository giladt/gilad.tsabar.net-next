"use client";
import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type PageTransitionProps = HTMLMotionProps<"div">;
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>;

function PageTransition(
  { children, ...rest }: PageTransitionProps,
  ref: PageTransitionRef
) {
  const onTheRight = { x: "100%" };
  const inTheCenter = { x: "0%" };
  const onTheLeft = { x: "-100%" };

  const transition = { duration: 0.6, ease: "easeInOut" };

  return (
    <motion.article
      ref={ref}
      initial={onTheLeft}
      animate={inTheCenter}
      exit={onTheRight}
      transition={transition}
      className="max-h-[100%]; overflow-x-hidden"
      {...rest}
    >
      {children}
    </motion.article>
  );
}

export default forwardRef(PageTransition);
