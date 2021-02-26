import * as React from 'react';
import 'styles/globals.scss';
import { AppProps } from 'next/app';

import { AnimatePresence } from 'framer-motion';

import { Header } from 'components/header';
import { IRouteDirection } from 'interfaces';

export const RouteContext = React.createContext<{
  routeDirection: IRouteDirection;
  setRouteDirection: React.Dispatch<React.SetStateAction<IRouteDirection>>;
} | null>(null);

export default function App({ Component, pageProps, router }: AppProps) {
  const [routeDirection, setRouteDirection] = React.useState<IRouteDirection>({
    route: '',
    direction: '',
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
