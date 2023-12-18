import React from 'react';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import PlayOrderPage from '../pages/PlayOrderPage';
import SyntaxProblemPage from '../pages/SyntaxProblemPage';
import PlayRememberPage from '../pages/PlayRememberPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminPage from '../pages/AdminPage';
import RegisterPage from '../pages/RegisterPage';
import RegisterConfirmPage from '../pages/RegisterConfirmPage';
import EmailVerify from '../pages/EmailVerify';
import RememberProblemPage from '../pages/RememberProblemPage';
import OrderProblemPage from '../pages/OrderProblemPage';
import PlaySyntaxPage from '../pages/PlaySyntaxPage';

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
    path: '/',
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
    path: '/verify/*',
    element: <EmailVerify />,
    exact: true,
  },
  {
    path: '/play-order',
    element: <PlayOrderPage />,
    exact: true,
  },
  {
    path: '/play-syntax',
    element: <SyntaxProblemPage />,
    exact: true,
    needLogin: true,
  },
  {
    path: '/play-syntax/:type/:level',
    element: <PlaySyntaxPage />,
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
    path: '/play-remember/:level',
    element: <RememberProblemPage />,
    exact: true,
    needLogin: true,
  },
  {
    path: '/play-order/:type/:level',
    element: <OrderProblemPage />,
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
