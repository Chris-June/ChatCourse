/**
 * @file App.tsx
 * @description The root component of the web application.
 * It renders the main ChatInterface.
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import ChatPage from './pages/chat/ChatPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
