/**
 * @file App.tsx
 * @description The root component of the web application.
 * It renders the main ChatInterface.
 */

import ChatInterface from './components/Chat/ChatInterface';
import SettingsModal from './components/SettingsModal';

function App() {
  return (
    <main>
      <ChatInterface />
      <SettingsModal />
    </main>
  );
}

export default App;
