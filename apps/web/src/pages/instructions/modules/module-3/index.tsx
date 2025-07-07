import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Module3Page from './Module3Page';
import Lesson3_1 from './lessons/3.1';
import Lesson3_2 from './lessons/3.2';
import Lesson3_3 from './lessons/3.3';

const Module3Routes: React.FC = () => {
  const location = useLocation();

  // If the path is exactly /instructions/module-3, redirect to the first lesson
  if (location.pathname === '/instructions/module-3') {
    return <Navigate to="/instructions/module-3/3.1" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Module3Page />}>
        <Route path="3.1" element={<Lesson3_1 />} />
        <Route path="3.2" element={<Lesson3_2 />} />
        <Route path="3.3" element={<Lesson3_3 />} />
        <Route index element={<Navigate to="3.1" replace />} />
      </Route>
    </Routes>
  );
};

export default Module3Routes;
