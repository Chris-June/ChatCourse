import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Module8Page from './Module8Page';
import Lesson8_1 from './lessons/8.1';
import Lesson8_2 from './lessons/8.2';
import Lesson8_3 from './lessons/8.3';

const Module8Routes: React.FC = () => {
  const location = useLocation();

  // If the path is exactly /instructions/module-8, redirect to the first lesson
  if (location.pathname === '/instructions/module-8') {
    return <Navigate to="/instructions/module-8/8.1" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Module8Page />}>
        <Route path="8.1" element={<Lesson8_1 />} />
        <Route path="8.2" element={<Lesson8_2 />} />
        <Route path="8.3" element={<Lesson8_3 />} />
        <Route index element={<Navigate to="8.1" replace />} />
      </Route>
    </Routes>
  );
};

export default Module8Routes;
