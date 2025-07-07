import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AppendicesPage from './AppendicesPage';
import Glossary from './Glossary';
import FurtherReading from './FurtherReading';
import ToolsAndResources from './ToolsAndResources';

const AppendicesRoutes: React.FC = () => {
  const location = useLocation();

  // If the path is exactly /instructions/appendices, redirect to the glossary
  if (location.pathname === '/instructions/appendices') {
    return <Navigate to="/instructions/appendices/glossary" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<AppendicesPage />}>
        <Route path="glossary" element={<Glossary />} />
        <Route path="further-reading" element={<FurtherReading />} />
        <Route path="tools-resources" element={<ToolsAndResources />} />
        <Route index element={<Navigate to="glossary" replace />} />
      </Route>
    </Routes>
  );
};

export default AppendicesRoutes;
