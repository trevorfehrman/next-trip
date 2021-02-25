import '../styles/globals.scss';
import { AppProps } from 'next/app';

import { AnimatePresence } from 'framer-motion';

import { Header } from '../components/header';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Header />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  );
}
