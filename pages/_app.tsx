import React from "react";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { v5 as uuidv5 } from "uuid";

import { AnimatePresence, motion } from "framer-motion";
import Nav from "@/components/organisms/nav";

import { WindowContextProvider } from "@/contexts/windowContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const currentUrl = usePathname();

  return (
    <WindowContextProvider>
      <Nav currentUrl={currentUrl} />

      <AnimatePresence initial={false} mode="wait">
        <motion.div key={uuidv5(currentUrl, uuidv5.URL)}>
          <Component {...pageProps} />
          <motion.div
            className="absolute top-0 left-0 w-full h-[100vh] bg-slate-100 origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.35, ease: "anticipate" }}
          ></motion.div>
          <motion.div
            className="absolute top-0 left-0 w-full h-[100vh] bg-slate-100 origin-right"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.25, ease: "anticipate" }}
          ></motion.div>
        </motion.div>
      </AnimatePresence>
    </WindowContextProvider>
  );
}
