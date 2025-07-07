import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Module4Page from './Module4Page';
import Lesson4_1 from './lessons/4.1';
import Lesson4_2 from './lessons/4.2';
import Lesson4_3 from './lessons/4.3';

const Module4Routes: React.FC = () => {
  const location = useLocation();

  // If the path is exactly /instructions/module-4, redirect to the first lesson
  if (location.pathname === '/instructions/module-4') {
    return <Navigate to="/instructions/module-4/4.1" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Module4Page />}>
        <Route path="4.1" element={<Lesson4_1 />} />
        <Route path="4.2" element={<Lesson4_2 />} />
        <Route path="4.3" element={<Lesson4_3 />} />
        <Route index element={<Navigate to="4.1" replace />} />
      </Route>
    </Routes>
  );
};

export default Module4Routes;
