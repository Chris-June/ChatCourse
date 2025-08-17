import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Module7Page from './Module7Page';
import OverviewModule7 from './Overview';
import Lesson7_1 from './lessons/7.1';
import Lesson7_2 from './lessons/7.2';
import Lesson7_3 from './lessons/7.3';
import ProtectedRoute from '../../../../components/ProtectedRoute';

const Module7Routes: React.FC = () => {
  const location = useLocation();

  // If the path is exactly /instructions/module-7, redirect to the module overview
  if (location.pathname === '/instructions/module-7') {
    return <Navigate to="/instructions/module-7/overview" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Module7Page />}>
        <Route path="overview" element={<OverviewModule7 />} />
        <Route path="7.1" element={<ProtectedRoute module={7} lesson={1}><Lesson7_1 /></ProtectedRoute>} />
        <Route path="7.2" element={<ProtectedRoute module={7} lesson={2}><Lesson7_2 /></ProtectedRoute>} />
        <Route path="7.3" element={<ProtectedRoute module={7} lesson={3}><Lesson7_3 /></ProtectedRoute>} />
        <Route index element={<Navigate to="overview" replace />} />
      </Route>
    </Routes>
  );
};

export default Module7Routes;
