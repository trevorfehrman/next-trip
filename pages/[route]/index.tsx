import * as React from 'react';
import styles from 'styles/Direction.module.scss';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

import { IDirection, IRoute } from 'interfaces';
import { getDirections, getRoutes } from 'client/helpers';
import { RouteContext } from 'pages/_app';

export async function getStaticPaths() {
  const res = await getRoutes();
  const routes: IRoute[] = await res.json();

  const paths = routes.map(route => ({
    params: { route: route.Route },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { route: string } }) {
  const res = await getDirections(params.route);
  const directions: IDirection[] = await res.json();

  return { props: { directions, route: params.route } };
}

type RouteProps = {
  directions: IDirection[];
  route: string;
};

const DirectionScreen = ({ directions, route }: RouteProps) => {
  const { routeDirection, setRouteDirection } = React.useContext(RouteContext);
  const router = useRouter();

  React.useEffect(() => {
    router.beforePopState(popstate => {
      const urlArray = popstate.as.split('/');

      if (urlArray[1] && urlArray[2]) {
        // We are navigating to the stops screen from the directions screen
        setRouteDirection(prev => ({ ...prev, direction: prev.preveiousDirection }));
        return true;
      } else if (urlArray[1]) {
        // We are navigationg to the directions screen from either the stops screen *or* the routes screen
        setRouteDirection(prev => ({
          ...prev,
          direction: '',
          route: routeDirection.route ? routeDirection.route : '',
        }));
        return true;
      } else {
        // We are navigating to the routes screen from the directions screen
        setRouteDirection(prev => ({ ...prev, route: '' }));
        return true;
      }
    });
  }, []);

  return (
    <motion.main initial={{ y: '100vh' }} animate={{ y: 0 }} exit={{ y: '100vh' }}>
      <ul>
        {directions.map((direction, index) => (
          <Link key={direction.Value} href={`/${route}/${direction.Value}`}>
            <li
              onClick={() =>
                setRouteDirection(prev => ({
                  ...prev,
                  direction: direction.Text,
                  preveiousDirection: direction.Text,
                }))
              }
              className={`${styles.direction} 
              ${index === 0 ? styles.firstDirection : styles.secondDirection}`}
            >
              <span>{direction.Text}</span>
            </li>
          </Link>
        ))}
      </ul>
    </motion.main>
  );
};

export default DirectionScreen;
