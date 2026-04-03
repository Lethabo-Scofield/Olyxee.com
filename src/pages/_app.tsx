import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import "../app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="Olyxee" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@Olyxee" />
      </Head>
      <AnimatePresence mode="wait">
        <motion.div
        key={router.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
