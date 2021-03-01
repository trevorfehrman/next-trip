import * as React from 'react';
import styles from 'styles/Header.module.scss';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { AnimatePresence, motion } from 'framer-motion';

import { RouteContext } from 'pages/_app';

const Header = () => {
  const { routeDirection, setRouteDirection } = React.useContext(RouteContext);
  const router = useRouter();

  return (
    <div className={styles.header}>
      <Link href='/'>
        <img
          src='/MetroTransitLogo.svg'
          alt='Metro Transit'
          onClick={() => setRouteDirection(prev => ({ ...prev, route: '', direction: '' }))}
        />
      </Link>
      <div className={styles.breadcrumbContainer}>
        {!routeDirection.route && !routeDirection.direction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            className={styles.subheadding}
          >
            Twin Cities Public Transportation
          </motion.div>
        )}
        <AnimatePresence>
          {routeDirection.route && (
            <motion.button
              name='route'
              key='route'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.breadcrumb}
              onClick={() => {
                router.push('/');
                setRouteDirection(prev => ({ ...prev, route: '', direction: '' }));
              }}
            >
              {routeDirection.route}
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {routeDirection.direction && (
            <motion.button
              name='direction'
              key='direction'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.breadcrumb}
              onClick={() => router.back()}
            >
              {routeDirection.direction}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { Header };
