import React from "react";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
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
            key={uuidv5(currentUrl + "_exit", uuidv5.URL)}
            className="absolute top-0 left-0 w-full h-[100vh] bg-stone-500 origin-right"
            initial={{ scaleX: 1.05 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            key={uuidv5(currentUrl + "_enter", uuidv5.URL)}
            className="absolute top-0 left-0 w-full h-[100vh] bg-stone-500 origin-bottom"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1.05 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          ></motion.div>
        </motion.div>
      </AnimatePresence>
      <Analytics />
    </WindowContextProvider>
  );
}
