import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RouteContext } from 'pages/_app';

import RoutesScreen from 'pages';
import { mockRouteDirectionContext, mockRoutes } from './mocks';

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  };
});

beforeEach(() => {
  render(
    <RouteContext.Provider value={mockRouteDirectionContext}>
      <RoutesScreen routes={mockRoutes} />
    </RouteContext.Provider>
  );
});

test('renders the routes screen', () => {
  expect(screen.getAllByRole('listitem').length).toBe(3);
  expect(screen.getByText('Test Route 1')).toBeInTheDocument;
});

test('navigate to next screen on link click', () => {
  const testRoute = screen.getByText('Test Route 1');
  userEvent.click(testRoute);

  expect(testRoute).not.toBeInTheDocument;
});

test('filters the routes on search', () => {
  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, { target: { value: '2' } });
  expect(input.value).toBe('2');

  const testRouteList = screen.queryAllByRole('listitem');
  expect(testRouteList.length).toBe(1);
});
