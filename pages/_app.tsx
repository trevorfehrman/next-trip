import * as React from 'react';
import 'styles/globals.scss';

import { AppProps } from 'next/app';

import { AnimatePresence } from 'framer-motion';

import { IRouteDirection } from 'interfaces';

import { Header } from 'components/header';

import Router from 'next/router';

export const RouteContext = React.createContext<{
  routeDirection: IRouteDirection;
  setRouteDirection: React.Dispatch<React.SetStateAction<IRouteDirection>>;
} | null>(null);
RouteContext.displayName = 'RouteContext';

export default function App({ Component, pageProps, router }: AppProps) {
  const routeChange = () => {
    // Temporary fix to avoid flash of unstyled content
    // during route transitions. Keep an eye on this
    // issue and remove this code when resolved:
    // https://github.com/vercel/next.js/issues/17464

    const tempFix = () => {
      const allStyleElems = document.querySelectorAll('style[media="x"]');
      allStyleElems.forEach(elem => {
        elem.removeAttribute('media');
      });
    };
    tempFix();
  };

  Router.events.on('routeChangeComplete', routeChange);
  Router.events.on('routeChangeStart', routeChange);
  const [routeDirection, setRouteDirection] = React.useState<IRouteDirection>({
    route: '',
    direction: '',
    previousRoute: '',
    preveiousDirection: '',
  });
  return (
    <>
      <RouteContext.Provider value={{ routeDirection, setRouteDirection }}>
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </RouteContext.Provider>
    </>
  );
}
