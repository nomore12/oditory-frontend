import React from 'react';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import PlayOrderPage from '../pages/PlayOrderPage';
import PlayUnderstandPage from '../pages/PlayUnderstandPage';
import PlayRememberPage from '../pages/PlayRememberPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminPage from '../pages/AdminPage';

export interface RouteItem {
  path: string;
  element: React.ReactElement;
  exact?: boolean;
  children?: RouteItem[];
}

const routes: RouteItem[] = [
  {
    path: '/main',
    element: <MainPage />,
    exact: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
    exact: true,
  },
  {
    path: '/play-order',
    element: <PlayOrderPage />,
    exact: true,
  },
  {
    path: '/play-understand',
    element: <PlayUnderstandPage />,
    exact: true,
  },
  {
    path: '/play-remember',
    element: <PlayRememberPage />,
    exact: true,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
    exact: true,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    exact: true,
  },
];

export default routes;
