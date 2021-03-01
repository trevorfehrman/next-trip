import * as React from 'react';
import styles from 'styles/Routes.module.scss';

import Head from 'next/head';

import { motion } from 'framer-motion';

import { IRoute } from 'interfaces';
import { getRoutes } from 'client/helpers';

import { Route } from 'components/route';

export async function getStaticProps() {
  const routes = await (await getRoutes()).json();
  return { props: { routes }, revalidate: 5000 };
}

const RoutesScreen = ({ routes }: { routes: IRoute[] }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return (
    <>
      <Head>
        <title>Routes</title>
        <meta name='description' content='Bus routes for the twin cities metropolitan area'></meta>
      </Head>
      <motion.main initial={{ y: '100vh' }} animate={{ y: 0 }} exit={{ y: '100vh' }}>
        <label htmlFor='search' style={{ position: 'absolute', left: '-1000rem' }}>
          Search
        </label>
        <input
          id='search'
          name='search'
          placeholder='Search...'
          type='search'
          autoComplete='off'
          onChange={handleChange}
          value={searchTerm}
          className={styles.searchField}
        />
        <ul className={styles.routesContainer}>
          {routes
            .filter(route => {
              return searchTerm
                ? route.Description.toLowerCase().includes(searchTerm.toLowerCase())
                : true;
            })
            .map(route => (
              <Route key={route.Description} route={route} />
            ))}
        </ul>
      </motion.main>
    </>
  );
};

export default RoutesScreen;
