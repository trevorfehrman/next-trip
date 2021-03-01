import { IRoute, IRouteDirection } from 'interfaces';

const mockRouteDirectionContext: {
  routeDirection: IRouteDirection;
  setRouteDirection: () => void;
} = {
  routeDirection: {
    route: 'Test Route',
    direction: '',
    preveiousDirection: '',
    previousRoute: '',
  },
  setRouteDirection: () => {},
};

const mockRoutes: IRoute[] = [
  {
    Description: 'Test Route 1',
    ProviderID: '1',
    Route: '7',
  },
  {
    Description: 'Test Route 2',
    ProviderID: '2',
    Route: '8',
  },
  {
    Description: 'Test Route 3',
    ProviderID: '3',
    Route: '9',
  },
];

export { mockRouteDirectionContext, mockRoutes };
