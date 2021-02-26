interface IRoute {
  Description: string;
  ProviderID: string;
  Route: string;
}

interface IDirection {
  Text: string;
  Value: string;
}

interface IStop {
  Text: string;
  Value: string;
}

interface IRouteDirection {
  route: string;
  direction: string;
}

export type { IRoute, IDirection, IStop, IRouteDirection };
