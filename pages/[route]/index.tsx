import styles from 'styles/Route.module.scss';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { IDirection, IRoute } from 'interfaces';

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://svc.metrotransit.org/NexTrip/Routes?format=json', {
    mode: 'no-cors',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  });
  const posts: IRoute[] = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map(post => ({
    params: { route: post.Route },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }: { params: { route: string } }) {
  // params contains the post `route`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `http://svc.metrotransit.org/NexTrip/Directions/${params.route}?format=json`,
    {
      mode: 'no-cors',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  const directions: IDirection[] = await res.json();

  // Pass post data to the page via props
  return { props: { directions, route: params.route } };
}

type RouteProps = {
  directions: IDirection[];
  route: string;
};

const Route = ({ directions, route }: RouteProps) => {
  return (
    <motion.main initial={{ y: '100vh' }} animate={{ y: 0 }} exit={{ y: '100vh' }}>
      <ul>
        {directions.map((direction, key) => (
          <Link key={direction.Value} href={`/${route}/${direction.Value}`}>
            <li
              className={`${styles.direction} 
              ${key === 0 ? styles.firstDirection : styles.secondDirection}`}
            >
              <span>{direction.Text}</span>
            </li>
          </Link>
        ))}
      </ul>
    </motion.main>
  );
};

export default Route;
