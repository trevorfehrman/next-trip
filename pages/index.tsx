import * as React from 'react';
import styles from '../styles/Home.module.scss';

import Head from 'next/head';
import Link from 'next/link';

import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import { IRoute } from '../interfaces';

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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return (
    <motion.main exit={{ x: '-100vw' }} initial={{ x: -300 }} animate={{ x: 0 }}>
      <input type='text' onChange={handleChange} value={searchTerm} />
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
              <li className={styles.route}>{route.Description}</li>
            </Link>
          ))}
      </ul>
    </motion.main>
  );
};

export default Home;
