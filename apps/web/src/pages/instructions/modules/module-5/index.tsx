import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Module5Page from './Module5Page';
import Lesson5_1 from './lessons/5.1';
import Lesson5_2 from './lessons/5.2';
import Lesson5_3 from './lessons/5.3';
import ProtectedRoute from '../../../../components/ProtectedRoute';

const Module5Routes: React.FC = () => {
  const location = useLocation();

  // If the path is exactly /instructions/module-5, redirect to the first lesson
  if (location.pathname === '/instructions/module-5') {
    return <Navigate to="/instructions/module-5/5.1" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Module5Page />}>
        <Route path="5.1" element={<ProtectedRoute module={5} lesson={1}><Lesson5_1 /></ProtectedRoute>} />
        <Route path="5.2" element={<ProtectedRoute module={5} lesson={2}><Lesson5_2 /></ProtectedRoute>} />
        <Route path="5.3" element={<ProtectedRoute module={5} lesson={3}><Lesson5_3 /></ProtectedRoute>} />
        <Route index element={<Navigate to="5.1" replace />} />
      </Route>
    </Routes>
  );
};

export default Module5Routes;
