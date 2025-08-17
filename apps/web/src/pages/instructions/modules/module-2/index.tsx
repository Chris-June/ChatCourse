import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Module2Page from './Module2Page';
import OverviewModule2 from './Overview';
import Lesson2_1 from './lessons/2.1';
import Lesson2_2 from './lessons/2.2';
import Lesson2_3 from './lessons/2.3';
import ProtectedRoute from '../../../../components/ProtectedRoute';

const Module2Routes: React.FC = () => {
  const location = useLocation();

  // If the path is exactly /instructions/module-2, redirect to the module overview
  if (location.pathname === '/instructions/module-2') {
    return <Navigate to="/instructions/module-2/overview" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Module2Page />}>
        <Route path="overview" element={<OverviewModule2 />} />
        <Route path="2.1" element={<ProtectedRoute module={2} lesson={1}><Lesson2_1 /></ProtectedRoute>} />
        <Route path="2.2" element={<ProtectedRoute module={2} lesson={2}><Lesson2_2 /></ProtectedRoute>} />
        <Route path="2.3" element={<ProtectedRoute module={2} lesson={3}><Lesson2_3 /></ProtectedRoute>} />
        <Route index element={<Navigate to="overview" replace />} />
      </Route>
    </Routes>
  );
};

export default Module2Routes;
