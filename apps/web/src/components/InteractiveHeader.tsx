import React from 'react';
import { Sparkles } from 'lucide-react';

interface InteractiveHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

const InteractiveHeader: React.FC<InteractiveHeaderProps> = ({
  title = 'Interactive Activity',
  subtitle = 'Hands-on learning — try it now',
  icon: Icon = Sparkles,
  className = '',
}) => {
  return (
    <div
      className={
        `relative overflow-hidden rounded-xl border mb-4 ` +
        `bg-interactive/10 border-interactive/30 text-interactive ` +
        className
      }
      role="banner"
      aria-label="Interactive learning"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-interactive/20 flex items-center justify-center border border-interactive/30">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-tight truncate">{title}</div>
          <div className="text-xs opacity-80 truncate">{subtitle}</div>
        </div>
      </div>
      {/* subtle top border accent */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-interactive/50 to-transparent" />
    </div>
  );
};

export default InteractiveHeader;
