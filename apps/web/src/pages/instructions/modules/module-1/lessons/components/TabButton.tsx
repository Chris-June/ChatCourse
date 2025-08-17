import React from 'react';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-3 text-sm font-medium rounded-t-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
      active
        ? 'bg-card text-primary border-b-2 border-primary'
        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
    }`}
  >
    <span className="mr-2">{icon}</span>
    {label}
  </button>
);

export default TabButton;
