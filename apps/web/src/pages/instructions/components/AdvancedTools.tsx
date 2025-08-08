import React, { useState } from 'react';
import { Layers, Zap, Target } from 'lucide-react';
import { 
  PromptChallenges, 
  PromptPatternLibrary, 
  PromptVisualizer 
} from '../../../components/prompting/advanced';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';

const AdvancedTools: React.FC = () => {
  const [value, setValue] = useState<'visualizer' | 'patterns' | 'challenges'>('challenges');

  const order: Array<typeof value> = ['visualizer', 'patterns', 'challenges'];

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = order.indexOf(value);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = order[(idx + 1) % order.length];
      setValue(next);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = order[(idx - 1 + order.length) % order.length];
      setValue(prev);
    }
  };

  return (
    <div className="bg-card text-card-foreground p-4 md:p-6 rounded-xl border my-6 shadow-sm">
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Advanced Tools Playground</h3>
      <Tabs value={value} onValueChange={(v: string) => setValue(v as typeof value)}>
        <TabsList className="mb-4" onKeyDown={onKeyDown} aria-label="Advanced tools tabs">
          <TabsTrigger value="visualizer">
            <Target className="h-4 w-4" aria-hidden="true" />
            <span className="ml-2">Prompt Visualizer</span>
          </TabsTrigger>
          <TabsTrigger value="patterns">
            <Layers className="h-4 w-4" aria-hidden="true" />
            <span className="ml-2">Pattern Library</span>
          </TabsTrigger>
          <TabsTrigger value="challenges">
            <Zap className="h-4 w-4" aria-hidden="true" />
            <span className="ml-2">Prompt Challenges</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="visualizer" role="tabpanel">
          <PromptVisualizer />
        </TabsContent>
        <TabsContent value="patterns" role="tabpanel">
          <PromptPatternLibrary />
        </TabsContent>
        <TabsContent value="challenges" role="tabpanel">
          <PromptChallenges />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedTools;
