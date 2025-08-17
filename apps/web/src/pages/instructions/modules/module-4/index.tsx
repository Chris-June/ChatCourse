import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Module4Page from './Module4Page';
import OverviewModule4 from './Overview';
import Lesson4_1 from './lessons/4.1';
import Lesson4_2 from './lessons/4.2';
import Lesson4_3 from './lessons/4.3';
import Lesson4_4 from './lessons/4.4';
import Lesson4_5 from './lessons/4.5';
import Lesson4_6 from './lessons/4.6';
import ProtectedRoute from '../../../../components/ProtectedRoute';

const Module4Routes: React.FC = () => {
  const location = useLocation();

  // If the path is exactly /instructions/module-4, redirect to the module overview
  if (location.pathname === '/instructions/module-4') {
    return <Navigate to="/instructions/module-4/overview" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Module4Page />}>
        <Route path="overview" element={<OverviewModule4 />} />
        <Route path="4.1" element={<ProtectedRoute module={4} lesson={1}><Lesson4_1 /></ProtectedRoute>} />
        <Route path="4.2" element={<ProtectedRoute module={4} lesson={2}><Lesson4_2 /></ProtectedRoute>} />
        <Route path="4.3" element={<ProtectedRoute module={4} lesson={3}><Lesson4_3 /></ProtectedRoute>} />
        <Route path="4.4" element={<ProtectedRoute module={4} lesson={4}><Lesson4_4 /></ProtectedRoute>} />
        <Route path="4.5" element={<ProtectedRoute module={4} lesson={5}><Lesson4_5 /></ProtectedRoute>} />
        <Route path="4.6" element={<ProtectedRoute module={4} lesson={6}><Lesson4_6 /></ProtectedRoute>} />
        <Route index element={<Navigate to="overview" replace />} />
      </Route>
    </Routes>
  );
};

export default Module4Routes;
