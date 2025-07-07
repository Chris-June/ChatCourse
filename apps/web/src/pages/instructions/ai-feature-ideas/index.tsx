import { Route, Routes } from 'react-router-dom';
import AIFeatureIdeas from './AIFeatureIdeas';

const AIFeatureIdeasRoutes = () => {
  return (
    <Routes>
      <Route index element={<AIFeatureIdeas />} />
    </Routes>
  );
};

export default AIFeatureIdeasRoutes;
