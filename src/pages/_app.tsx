import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { Geist, Inter, Caveat } from "next/font/google";
import "../app/globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-handwritten",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div className={`${geist.variable} ${inter.variable} ${caveat.variable}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="Olyxee" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@Olyxee" />
      </Head>
      <AnimatePresence mode="wait" initial={false}>
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
    </div>
  );
}
