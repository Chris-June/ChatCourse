import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Module1Page from './Module1Page';
import Lesson1_1 from './lessons/1.1';
import Lesson1_2 from './lessons/1.2';
import Lesson1_3 from './lessons/1.3';
import Lesson1_4 from './lessons/1.4';
import Lesson1_5 from './lessons/1.5';
import Lesson1_6 from './lessons/1.6';
import Lesson1_7 from './lessons/1.7';
import Lesson1_8 from './lessons/1.8';
import ProtectedRoute from '../../../../components/ProtectedRoute';

const Module1Routes: React.FC = () => {
  const location = useLocation();
  
  // If the path is exactly /instructions/module-1, redirect to the module page
  if (location.pathname === '/instructions/module-1') {
    return <Navigate to="/instructions/module-1/1.1" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Module1Page />}>
        <Route path="1.1" element={<ProtectedRoute module={1} lesson={1}><Lesson1_1 /></ProtectedRoute>} />
        <Route path="1.2" element={<ProtectedRoute module={1} lesson={2}><Lesson1_2 /></ProtectedRoute>} />
        <Route path="1.3" element={<ProtectedRoute module={1} lesson={3}><Lesson1_3 /></ProtectedRoute>} />
        <Route path="1.4" element={<ProtectedRoute module={1} lesson={4}><Lesson1_4 /></ProtectedRoute>} />
        <Route path="1.5" element={<ProtectedRoute module={1} lesson={5}><Lesson1_5 /></ProtectedRoute>} />

        <Route path="1.6" element={<ProtectedRoute module={1} lesson={6}><Lesson1_6 /></ProtectedRoute>} />
        <Route path="1.7" element={<ProtectedRoute module={1} lesson={7}><Lesson1_7 /></ProtectedRoute>} />
        <Route path="1.8" element={<ProtectedRoute module={1} lesson={8}><Lesson1_8 /></ProtectedRoute>} />
        <Route index element={<Navigate to="1.1" replace />} />
      </Route>
    </Routes>
  );
};

export default Module1Routes;
