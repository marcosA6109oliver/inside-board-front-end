import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Auth from '@pages/Auth';
import store from '@store/store';
import ProtectedRoute from '@components/auth/ProtectedRoute';
import Loading from '@components/layout/Loading';
import Home from '@pages/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />

          {/* Rota protegida */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/loading" element={<Loading />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;