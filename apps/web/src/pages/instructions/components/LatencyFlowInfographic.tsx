import { ArrowRight } from 'lucide-react';

const LatencyBlock = ({ title, time, isLast = false }: { title: string; time: string; isLast?: boolean }) => (
  <div className="flex items-center">
    <div className="text-center">
      <div className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
        <p className="font-bold text-white">{title}</p>
        <p className="text-sm text-cyan-400">{time}</p>
      </div>
    </div>
    {!isLast && <ArrowRight className="w-8 h-8 text-gray-500 mx-2 flex-shrink-0" />}
  </div>
);

export default function LatencyFlowInfographic() {
  return (
    <div className="my-8 p-6 bg-gray-900/50 border border-gray-700 rounded-xl">
      <h4 className="text-lg font-semibold text-center mb-6 text-white">Anatomy of AI Latency: Where Does the Time Go?</h4>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <LatencyBlock title="User Input" time="+0ms" />
        <LatencyBlock title="Network to API" time="+50-200ms" />
        <LatencyBlock title="Model Wait Time" time="+100-500ms" />
        <LatencyBlock title="Generation (TTFT)" time="+200-1000ms" />
        <LatencyBlock title="Network to UI" time="+50-200ms" />
        <LatencyBlock title="UI Render" time="+20ms" isLast />
      </div>
      <p className="text-center text-sm text-gray-400 mt-6">
        Total perceived latency is the sum of all these steps. Streaming tackles the biggest chunk: the user's wait during generation.
      </p>
    </div>
  );
}
