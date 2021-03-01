import * as React from 'react';
import styles from 'styles/Routes.module.scss';

import Link from 'next/link';

import { RiArrowRightSLine } from 'react-icons/ri';

import { RouteContext } from 'pages/_app';
import { IRoute } from 'interfaces';

const Route = ({ route }: { route: IRoute }) => {
  const { setRouteDirection } = React.useContext(RouteContext);
  const regex = new RegExp('[0-9]');

  const [segments, setSegments] = React.useState<string[]>();

  React.useEffect(() => {
    setSegments(route.Description.split('-'));
  }, [route]);

  function handleClick() {
    setRouteDirection(prev => ({
      ...prev,
      route: route.Description,
      previousRoute: route.Description,
    }));
  }

  return (
    <Link href={`/${route.Route}`}>
      <li onClick={handleClick} className={styles.route}>
        {regex.test(route.Description[0]) ? (
          // If the first character is a number, then we are on a numbered route.
          <>
            <div className={styles.segmentsContainer}>
              <div className={styles.routeNumber}>{segments && segments[0].trim()}</div>
              <div className={styles.stopsContainer}>
                {segments?.slice(1).map(segment => (
                  <div key={segment} className={styles.stop}>
                    {segment}
                  </div>
                ))}
              </div>
            </div>
            <RiArrowRightSLine className={styles.chevron} />
          </>
        ) : (
          // Otherwise just render it.
          <>
            <div>{route.Description}</div>
            <RiArrowRightSLine className={styles.chevron} />
          </>
        )}
      </li>
    </Link>
  );
};

export { Route };
