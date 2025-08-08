import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const LatencyBlock = ({ title, time, isLast = false }: { title: string; time: string; isLast?: boolean }) => (
  <div className="flex items-center">
    <div className="text-center">
      <div className="rounded-lg px-4 py-2 border bg-muted">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-primary/80">{time}</p>
      </div>
    </div>
    {!isLast && (
      <ArrowRight className="w-8 h-8 text-muted-foreground mx-2 flex-shrink-0" aria-hidden="true" />
    )}
  </div>
);

export default function LatencyFlowInfographic() {
  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle className="text-center text-base md:text-lg">Anatomy of AI Latency: Where Does the Time Go?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <LatencyBlock title="User Input" time="+0ms" />
          <LatencyBlock title="Network to API" time="+50-200ms" />
          <LatencyBlock title="Model Wait Time" time="+100-500ms" />
          <LatencyBlock title="Generation (TTFT)" time="+200-1000ms" />
          <LatencyBlock title="Network to UI" time="+50-200ms" />
          <LatencyBlock title="UI Render" time="+20ms" isLast />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Total perceived latency is the sum of all these steps. Streaming tackles the biggest chunk: the user's wait during generation.
        </p>
      </CardContent>
    </Card>
  );
}
