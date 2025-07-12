import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Module8Page from './Module8Page';
import Lesson8_1 from './lessons/8.1';
import Lesson8_2 from './lessons/8.2';
import Lesson8_3 from './lessons/8.3';
import ProtectedRoute from '../../../../components/ProtectedRoute';

const Module8Routes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Module8Page />}>
        <Route path="8.1" element={<ProtectedRoute module={8} lesson={1}><Lesson8_1 /></ProtectedRoute>} />
        <Route path="8.2" element={<ProtectedRoute module={8} lesson={2}><Lesson8_2 /></ProtectedRoute>} />
        <Route path="8.3" element={<ProtectedRoute module={8} lesson={3}><Lesson8_3 /></ProtectedRoute>} />
        {/* Redirect from /instructions/module-8 to the first lesson */}
        <Route index element={<Navigate to="8.1" replace />} />
      </Route>
    </Routes>
  );
};

export default Module8Routes;
