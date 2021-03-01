import styles from 'styles/Stops.module.scss';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion';
import { RiMapPin2Line } from 'react-icons/ri';

import { IStop } from 'interfaces';
import { getStops } from 'client/helpers';

export async function getServerSideProps({
  params,
}: {
  params: { route: string; direction: string };
}) {
  const res = await getStops(params.route, params.direction);
  const stops = await res.json();

  return {
    props: { stops },
  };
}

type StopsScreeenProps = {
  stops: IStop[];
};

const StopsScreen = ({ stops }: StopsScreeenProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Stops</title>
        <meta name='description' content='All the stops on this route and direction'></meta>
      </Head>
      <motion.main initial={{ y: '100vh' }} animate={{ y: 0 }} exit={{ y: '100vh' }}>
        <ul className={styles.stopsContainer}>
          {stops.map(stop => (
            <li
              className={styles.stop}
              key={stop.Value}
              onClick={() => router.push(`https://maps.google.com/?q=${stop.Text}+minnesota`)}
            >
              <RiMapPin2Line className={styles.pin} />
              <span className={styles.text}>{stop.Text}</span>
            </li>
          ))}
        </ul>
      </motion.main>
    </>
  );
};

export default StopsScreen;
