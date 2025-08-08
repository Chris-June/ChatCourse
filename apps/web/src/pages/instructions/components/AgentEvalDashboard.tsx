import React from 'react';
import { CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

type TrendDirection = 'up' | 'down' | 'neutral';

const MetricCard = ({
  icon,
  title,
  value,
  trend,
  trendDirection,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  trendDirection: TrendDirection;
}) => {
  const trendColor =
    trendDirection === 'up'
      ? 'text-emerald-500'
      : trendDirection === 'down'
      ? 'text-red-500'
      : 'text-muted-foreground';

  return (
    <div className="bg-card text-card-foreground p-4 rounded-xl border shadow-sm">
      <div className="flex items-center mb-2">
        <div className="text-primary mr-3" aria-hidden="true">{icon}</div>
        <h4 className="font-semibold text-foreground">{title}</h4>
      </div>
      <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
      <div className={`flex items-center text-sm ${trendColor}`} aria-live="polite">
        <TrendingUp className="h-4 w-4 mr-1" aria-hidden="true" />
        <span className="sr-only">Trend: {trendDirection}. </span>
        <span>{trend} vs. last week</span>
      </div>
    </div>
  );
};

const AgentEvalDashboard: React.FC = () => {
  return (
    <div className="my-6 p-4 md:p-6 bg-card text-card-foreground rounded-xl border shadow-sm">
      <h3 className="text-lg md:text-xl font-semibold text-center text-foreground mb-6">Agent Performance Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard 
          icon={<CheckCircle className="h-5 w-5" />} 
          title="Task Completion Rate"
          value="92.5%"
          trend="+3.1%"
          trendDirection='up'
        />
        <MetricCard 
          icon={<Clock className="h-5 w-5" />} 
          title="Avg. Response Time"
          value="1.8s"
          trend="-0.4s"
          trendDirection='up' // Lower is better, so 'up' is good
        />
        <MetricCard 
          icon={<AlertTriangle className="h-5 w-5" />} 
          title="Tool Error Rate"
          value="1.2%"
          trend="+0.5%"
          trendDirection='down' // Higher is worse, so 'down' is bad
        />
      </div>
    </div>
  );
};

export default AgentEvalDashboard;
