import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { SWRConfig } from 'swr';

function App() {
  return (
    <div className="App">
      <Router>
        <MainLayout />
      </Router>
    </div>
  );
}

export default App;
