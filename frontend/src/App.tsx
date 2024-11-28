import { useState } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout, Guide, Auth, Monitoring, Maps, Request } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="guide" element={<Guide />} />
        <Route path="auth" element={<Auth />} />
        <Route path="monitoring" element={<Monitoring />}>
          <Route index element={<Maps />} />
          <Route path="maps" element={<Maps />} />
          <Route path="request" element={<Request />} />
        </Route>
      </Route>
      <Route path="/*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}

export default App;
