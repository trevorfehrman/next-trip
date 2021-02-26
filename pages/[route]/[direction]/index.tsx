import styles from 'styles/Direction.module.scss';
import { motion } from 'framer-motion';

import { IStop } from 'interfaces';

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

const Direction = ({ stops }: { stops: IStop[] }) => {
  return (
    <motion.main initial={{ y: '100vh' }} animate={{ y: 0 }} exit={{ y: '100vh' }}>
      <ul>
        {stops.map(stop => (
          <li className={styles.stop} key={stop.Value}>
            {stop.Text}
          </li>
        ))}
      </ul>
    </motion.main>
  );
};

export default Direction;
