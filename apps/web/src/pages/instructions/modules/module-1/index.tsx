import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Module1Page from './Module1Page';
import Lesson1_1 from './lessons/1.1';
import Lesson1_2 from './lessons/1.2';
import Lesson1_3 from './lessons/1.3';

const Module1Routes: React.FC = () => {
  const location = useLocation();
  
  // If the path is exactly /instructions/module-1, redirect to the module page
  if (location.pathname === '/instructions/module-1') {
    return <Navigate to="/instructions/module-1/1.1" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Module1Page />}>
        <Route path="1.1" element={<Lesson1_1 />} />
        <Route path="1.2" element={<Lesson1_2 />} />
        <Route path="1.3" element={<Lesson1_3 />} />
        <Route index element={<Navigate to="1.1" replace />} />
      </Route>
    </Routes>
  );
};

export default Module1Routes;
