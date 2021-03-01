import * as React from 'react';
import 'styles/globals.scss';

import { AppProps } from 'next/app';

import { AnimatePresence } from 'framer-motion';

import { IRouteDirection } from 'interfaces';

import { Header } from 'components/header';

export const RouteContext = React.createContext<{
  routeDirection: IRouteDirection;
  setRouteDirection: React.Dispatch<React.SetStateAction<IRouteDirection>>;
} | null>(null);
RouteContext.displayName = 'RouteContext';

export default function App({ Component, pageProps, router }: AppProps) {
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
