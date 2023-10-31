import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import routes from '../../routes/Routes';
import ProtectedRoute from '../../routes/ProtectedWrapper';
import NotFound from '../../pages/NotFound';
import Navigation from '../../components/commons/Navigation';
import ProblemNavigation from '../../components/commons/ProblemNavigation';

function MainLayout() {
  const location = useLocation();
  const showNavigation = ['/main'].includes(location.pathname);
  const showProblemNavigation = [
    '/play-remember',
    '/play-order',
    'play-understand',
  ].includes(location.pathname);

  return (
    <>
      {showNavigation && <Navigation />}
      {showProblemNavigation && <ProblemNavigation />}
      <Routes>
        {routes.map((route, index) =>
          route?.needLogin ? (
            <Route
              key={index}
              path={route.path}
              element={<ProtectedRoute>{route.element}</ProtectedRoute>}
            />
          ) : (
            <Route key={index} path={route.path} element={route.element} />
          )
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MainLayout;
