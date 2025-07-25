import React from 'react';
import { CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

const MetricCard = ({ icon, title, value, trend, trendDirection }: { icon: React.ReactNode, title: string, value: string, trend: string, trendDirection: 'up' | 'down' | 'neutral' }) => {
  const trendColor = trendDirection === 'up' ? 'text-green-400' : trendDirection === 'down' ? 'text-red-400' : 'text-gray-400';

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <div className="flex items-center mb-2">
        <div className="text-blue-400 mr-3">{icon}</div>
        <h4 className="font-semibold text-white">{title}</h4>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <div className={`flex items-center text-sm ${trendColor}`}>
        <TrendingUp size={16} className="mr-1" />
        <span>{trend} vs. last week</span>
      </div>
    </div>
  );
};

const AgentEvalDashboard: React.FC = () => {
  return (
    <div className="my-6 p-6 bg-gray-900 rounded-lg">
      <h3 className="text-xl font-bold text-center text-white mb-6">Agent Performance Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard 
          icon={<CheckCircle size={24} />} 
          title="Task Completion Rate"
          value="92.5%"
          trend="+3.1%"
          trendDirection='up'
        />
        <MetricCard 
          icon={<Clock size={24} />} 
          title="Avg. Response Time"
          value="1.8s"
          trend="-0.4s"
          trendDirection='up' // Lower is better, so 'up' is good
        />
        <MetricCard 
          icon={<AlertTriangle size={24} />} 
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
