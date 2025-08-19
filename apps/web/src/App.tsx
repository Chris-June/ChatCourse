/**
 * @file App.tsx
 * @description The root component of the web application.
 * It renders the main Router and ensures scroll-to-top on navigation.
 */

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import ChatPage from './pages/chat/ChatPage';
import InstructionsPage from './pages/instructions/InstructionsPage';
import ScrollToTop from './components/ScrollToTop';

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/chat', element: <ChatPage /> },
      { path: '/instructions/*', element: <InstructionsPage /> },
    ],
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
