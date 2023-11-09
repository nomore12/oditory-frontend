import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  UNSAFE_NavigationContext as NavigationContext,
} from 'react-router-dom';
import routes from '../../routes/Routes';
import ProtectedRoute from '../../routes/ProtectedWrapper';
import NotFound from '../../pages/NotFound';
import Navigation from '../../components/commons/Navigation';
import ProblemNavigation from '../../components/commons/ProblemNavigation';
import { OverlayProvider } from '../../context/OverlayContext';

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isBlocking, setIsBlocking] = useState(false);
  const showNavigation = ['/main'].includes(location.pathname);
  const [showProblemNavigation, setShowProblemNavigation] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [previousPath, setPreviousPath] = useState('');
  const isPathMatching = (path: string) => {
    const patterns = [
      /^\/play-remember$/,
      /^\/play-remember\/\d+$/,
      /^\/play-order$/,
      /^\/play-understand$/,
    ];

    return patterns.some((pattern) => pattern.test(path));
  };

  // const showProblemNavigation = isPathMatching(location.pathname.trim());

  useEffect(() => {
    setShowProblemNavigation(isPathMatching(location.pathname.trim()));
  }, [showProblemNavigation, location.pathname]);

  // useEffect(() => {
  //   setPreviousPath(currentPath);
  //   setCurrentPath(location.pathname);
  //
  //   const patterns = [/^\/play-remember\/\d+$/];
  //   console.log(patterns.some((pattern) => pattern.test(previousPath)));
  //
  //   console.log('URL:', currentPath, previousPath);
  // }, [location.key, previousPath, currentPath]);

  return (
    <OverlayProvider>
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
    </OverlayProvider>
  );
}

export default MainLayout;
