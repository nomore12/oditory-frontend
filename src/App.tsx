import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes/Routes';
import ProtectedRoute from './routes/ProtectedWrapper';

function App() {
  return (
    <div className="App">
      <Router>
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
