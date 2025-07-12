import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Module3Page from './Module3Page';
import Lesson3_1 from './lessons/3.1';
import Lesson3_2 from './lessons/3.2';
import Lesson3_3 from './lessons/3.3';
import ProtectedRoute from '../../../../components/ProtectedRoute';

const Module3Routes: React.FC = () => {
  const location = useLocation();

  // If the path is exactly /instructions/module-3, redirect to the first lesson
  if (location.pathname === '/instructions/module-3') {
    return <Navigate to="/instructions/module-3/3.1" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Module3Page />}>
        <Route path="3.1" element={<ProtectedRoute module={3} lesson={1}><Lesson3_1 /></ProtectedRoute>} />
        <Route path="3.2" element={<ProtectedRoute module={3} lesson={2}><Lesson3_2 /></ProtectedRoute>} />
        <Route path="3.3" element={<ProtectedRoute module={3} lesson={3}><Lesson3_3 /></ProtectedRoute>} />
        <Route index element={<Navigate to="3.1" replace />} />
      </Route>
    </Routes>
  );
};

export default Module3Routes;
