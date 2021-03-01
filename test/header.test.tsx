import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Header } from 'components/header';
import { RouteContext } from 'pages/_app';
import { mockRouteDirectionContext } from './mocks';

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  };
});

test('renders one and only one breadcrumb if only route is provided and displays the text', () => {
  render(
    <RouteContext.Provider
      value={{
        ...mockRouteDirectionContext,
        routeDirection: { ...mockRouteDirectionContext.routeDirection, route: 'Test Route' },
      }}
    >
      <Header />
    </RouteContext.Provider>
  );
  const breadcrumbList = screen.queryAllByRole('button');
  expect(breadcrumbList.length).toBe(1);

  expect(breadcrumbList[0].innerHTML).toBe('Test Route');
});

test('renders both breadcrumbs if both route and direction are provided and displays the text', () => {
  render(
    <RouteContext.Provider
      value={{
        ...mockRouteDirectionContext,
        routeDirection: {
          ...mockRouteDirectionContext.routeDirection,
          route: 'Test Route',
          direction: 'Test Direction',
        },
      }}
    >
      <Header />
    </RouteContext.Provider>
  );
  const breadcrumbList = screen.queryAllByRole('button');
  expect(breadcrumbList[0].innerHTML).toBe('Test Route');
  expect(breadcrumbList[1].innerHTML).toBe('Test Direction');
  expect(breadcrumbList.length).toBe(2);
});

test('clears the breadcrumb state upon clicking the Metro Transit logo', () => {
  render(
    <RouteContext.Provider
      value={{
        ...mockRouteDirectionContext,
        routeDirection: {
          ...mockRouteDirectionContext.routeDirection,
          route: 'Test Route',
          direction: 'Test Direction',
        },
      }}
    >
      <Header />
    </RouteContext.Provider>
  );

  const logo = screen.getByRole('img', {
    name: /metro transit/i,
  });

  userEvent.click(logo);

  setTimeout(() => {
    const breadcrumbList = screen.queryAllByRole('button');
    expect(breadcrumbList.length).toBe(0);
  }, 1000);
});
