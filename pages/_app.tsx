import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { usePathname } from "next/navigation";
import type { AppProps } from "next/app";

import { v5 as uuidv5 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";

import { WindowContextProvider } from "@/contexts/windowContext";
import Nav from "@/components/organisms/nav";
import PageTransition from "@/components/organisms/page-transition";

import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const currentUrl = usePathname();
  const genKey = (id: string = "container") =>
    uuidv5(currentUrl + "_" + id, uuidv5.URL);

  return (
    <WindowContextProvider>
      <Nav currentUrl={currentUrl} />

      <AnimatePresence initial={false} mode="wait">
        <motion.div key={genKey()}>
          <Component {...pageProps} />
          <PageTransition id={genKey("enter")} dir="horizontal" />
          <PageTransition id={genKey("exit")} dir="vertical-exit" />
        </motion.div>
      </AnimatePresence>
      <Analytics />
    </WindowContextProvider>
  );
}
