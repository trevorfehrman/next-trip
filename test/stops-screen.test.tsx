import { render, screen } from '@testing-library/react';

import { RouteContext } from 'pages/_app';
import { mockRouteDirectionContext, mockStops } from './mocks';

import StopsScreen from 'pages/[route]/[direction]';

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  };
});

beforeEach(() => {
  render(
    <RouteContext.Provider value={mockRouteDirectionContext}>
      <StopsScreen stops={mockStops} />
    </RouteContext.Provider>
  );
});

test('renders the routes screen', () => {
  expect(screen.getAllByRole('listitem').length).toBe(3);
  expect(screen.getByText('Test Stop 1')).toBeInTheDocument;
});
