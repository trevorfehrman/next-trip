import { NextRouter } from 'next/router';

import { IDirection, IRoute, IRouteDirection, IStop } from 'interfaces';

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

const mockDirections: IDirection[] = [
  {
    Text: 'Northbound',
    Value: '1',
  },
  {
    Text: 'Southbound',
    Value: '2',
  },
];

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined), // This one fixed it for me
  beforePopState: jest.fn(),
  isLocaleDomain: false,
  isReady: true,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

const mockStops: IStop[] = [
  {
    Text: 'Test Stop 1',
    Value: '1',
  },
  {
    Text: 'Test Stop 2',
    Value: '2',
  },
  {
    Text: 'Test Stop 3',
    Value: '3',
  },
];

export { mockRouteDirectionContext, mockRoutes, mockDirections, mockRouter, mockStops };
