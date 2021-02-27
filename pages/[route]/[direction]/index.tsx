import styles from 'styles/Stops.module.scss';
import { motion } from 'framer-motion';

import { IStop } from 'interfaces';

import { RiMapPin2Line } from 'react-icons/ri';

export async function getServerSideProps({
  params,
}: {
  params: { route: string; direction: string };
}) {
  const res = await fetch(
    `https://svc.metrotransit.org/NexTrip/Stops/${params.route}/${params.direction}?format=json`,
    {
      mode: 'no-cors',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  const stops = await res.json();
  return {
    props: { stops },
  };
}

const StopsScreen = ({ stops }: { stops: IStop[] }) => {
  return (
    <motion.main initial={{ y: '100vh' }} animate={{ y: 0 }} exit={{ y: '100vh' }}>
      <ul>
        {stops.map(stop => (
          <li className={styles.stop} key={stop.Value}>
            <RiMapPin2Line className={styles.pin} />
            <span className={styles.text}>{stop.Text}</span>
          </li>
        ))}
      </ul>
    </motion.main>
  );
};

export default StopsScreen;
