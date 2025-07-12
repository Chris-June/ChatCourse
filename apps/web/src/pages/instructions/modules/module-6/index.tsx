import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Module6Page from './Module6Page';
import Lesson6_1 from './lessons/6.1';
import Lesson6_2 from './lessons/6.2';
import Lesson6_3 from './lessons/6.3';
import ProtectedRoute from '../../../../components/ProtectedRoute';

const Module6Routes: React.FC = () => {
  const location = useLocation();

  // If the path is exactly /instructions/module-6, redirect to the first lesson
  if (location.pathname === '/instructions/module-6') {
    return <Navigate to="/instructions/module-6/6.1" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Module6Page />}>
        <Route path="6.1" element={<ProtectedRoute module={6} lesson={1}><Lesson6_1 /></ProtectedRoute>} />
        <Route path="6.2" element={<ProtectedRoute module={6} lesson={2}><Lesson6_2 /></ProtectedRoute>} />
        <Route path="6.3" element={<ProtectedRoute module={6} lesson={3}><Lesson6_3 /></ProtectedRoute>} />
        <Route index element={<Navigate to="6.1" replace />} />
      </Route>
    </Routes>
  );
};

export default Module6Routes;
