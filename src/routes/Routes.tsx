import React from 'react';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import PlayOrderPage from '../pages/PlayOrderPage';
import PlayUnderstandPage from '../pages/PlayUnderstandPage';
import PlayRememberPage from '../pages/PlayRememberPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminPage from '../pages/AdminPage';
import RegisterPage from '../pages/RegisterPage';
import RegisterConfirmPage from '../pages/RegisterConfirmPage';

export interface RouteItem {
  path: string;
  element: React.ReactElement;
  exact?: boolean;
  needLogin?: boolean;
  children?: RouteItem[];
}

const routes: RouteItem[] = [
  {
    path: '/main',
    element: <MainPage />,
    exact: true,
    needLogin: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
    exact: true,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    exact: true,
  },
  {
    path: '/register-confirm',
    element: <RegisterConfirmPage />,
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
    needLogin: true,
  },
  {
    path: '/play-remember',
    element: <PlayRememberPage />,
    exact: true,
    needLogin: true,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
    exact: true,
    needLogin: true,
  },
  {
    path: '/admin/*',
    element: <AdminPage />,
    exact: true,
    needLogin: true,
  },
];

export default routes;
