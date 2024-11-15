import { useState } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout, Guide, Auth } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="guide" element={<Guide />} />
        <Route path="auth" element={<Auth />} />
      </Route>
      <Route path="/*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}

export default App;
