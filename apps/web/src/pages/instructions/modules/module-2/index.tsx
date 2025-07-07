import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Module2Page from './Module2Page';
import Lesson2_1 from './lessons/2.1';
import Lesson2_2 from './lessons/2.2';
import Lesson2_3 from './lessons/2.3';

const Module2Routes: React.FC = () => {
  const location = useLocation();

  // If the path is exactly /instructions/module-2, redirect to the first lesson
  if (location.pathname === '/instructions/module-2') {
    return <Navigate to="/instructions/module-2/2.1" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Module2Page />}>
        <Route path="2.1" element={<Lesson2_1 />} />
        <Route path="2.2" element={<Lesson2_2 />} />
        <Route path="2.3" element={<Lesson2_3 />} />
        <Route index element={<Navigate to="2.1" replace />} />
      </Route>
    </Routes>
  );
};

export default Module2Routes;
