import React from 'react';
import ChatInterface from '../../components/Chat/ChatInterface';
import SettingsModal from '../../components/SettingsModal';

const ChatPage: React.FC = () => {
  return (
    <>
      <ChatInterface />
      <SettingsModal />
    </>
  );
};

export default ChatPage;
