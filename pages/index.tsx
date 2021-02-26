import * as React from 'react';
import styles from 'styles/Home.module.scss';

import Head from 'next/head';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { IRoute } from 'interfaces';
import { RouteContext } from './_app';

function getRoutes() {
  return fetch('http://svc.metrotransit.org/NexTrip/Routes?format=json', {
    mode: 'no-cors',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function getStaticProps() {
  const routes = await (await getRoutes()).json();
  return { props: { routes }, revalidate: 5000 };
}

type HomeProps = {
  routes: IRoute[];
};

const Home = ({ routes }: HomeProps) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const { setRouteDirection } = React.useContext(RouteContext);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return (
    <motion.main initial={{ y: '100vh' }} animate={{ y: 0 }} exit={{ y: '100vh' }}>
      <input
        placeholder='Search...'
        type='text'
        onChange={handleChange}
        value={searchTerm}
        className={styles.searchField}
      />
      <ul>
        {routes
          .filter(route => {
            if (!searchTerm) {
              return true;
            } else {
              return route.Description.toLowerCase().includes(searchTerm.toLowerCase());
            }
          })
          .map(route => (
            <Link href={`/${route.Route}`} key={route.Route}>
              <li
                onClick={() => setRouteDirection({ route: route.Description, direction: '' })}
                className={styles.route}
              >
                {route.Description}
              </li>
            </Link>
          ))}
      </ul>
    </motion.main>
  );
};

export default Home;
