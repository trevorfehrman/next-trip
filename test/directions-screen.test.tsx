import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RouterContext } from 'next/dist/next-server/lib/router-context';

import { RouteContext } from 'pages/_app';

import DirectionsScreen from 'pages/[route]';
import { mockDirections, mockRouteDirectionContext, mockRouter } from './mocks';

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  };
});

beforeEach(() => {
  render(
    <RouterContext.Provider value={mockRouter}>
      <RouteContext.Provider value={mockRouteDirectionContext}>
        <DirectionsScreen route={'1'} directions={mockDirections} />
      </RouteContext.Provider>
    </RouterContext.Provider>
  );
});

test('renders the routes screen', () => {
  expect(screen.getAllByRole('listitem').length).toBe(2);
  expect(screen.getByText('Northbound')).toBeInTheDocument;
});

test('navigate to next screen on link click', () => {
  const testDirection = screen.getByText('Northbound');
  userEvent.click(testDirection);

  expect(testDirection).not.toBeInTheDocument;
});
