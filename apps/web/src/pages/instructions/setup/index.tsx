import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectSetupPage from './ProjectSetupPage';

const SetupRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="project-setup" element={<ProjectSetupPage />} />
    </Routes>
  );
};

export default SetupRoutes;
