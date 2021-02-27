import * as React from 'react';
import styles from 'styles/Header.module.scss';

import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import { RouteContext } from 'pages/_app';

const Header = () => {
  const { routeDirection, setRouteDirection } = React.useContext(RouteContext);
  const router = useRouter();

  function handleNavigateHome() {
    setRouteDirection(prev => ({ ...prev, route: '', direction: '' }));
    router.push('/');
  }

  return (
    <div className={styles.header}>
      <img src='/MetroTransitLogo.svg' alt='Metro Transit' onClick={() => handleNavigateHome()} />
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
            <motion.div
              key='route'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.breadcrumb}
              onClick={() => router.back()}
            >
              {routeDirection.route}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {routeDirection.direction && (
            <motion.div
              key='direction'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.breadcrumb}
            >
              {routeDirection.direction}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { Header };
