import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertTriangle, Lightbulb } from 'lucide-react';

const debugData = {
  userPrompt: "Book a flight to JFK for this Friday.",
  buggySchema: {
    name: 'book_flight',
    description: 'Books a flight for a user.',
    parameters: {
      type: 'object',
      properties: {
        destination: {
          type: 'string',
          description: 'The destination airport code, e.g., SFO, JFK.'
        },
        // BUG: 'date' is a required parameter but is missing from the properties object.
      },
      required: ['destination', 'date']
    }
  },
  llmError: 'Error: The following required parameters are missing from the function call: `date`.',
  explanation: 'The bug is in the function schema itself. The `required` array lists `date` as a mandatory parameter, but the `properties` object does not define it. The LLM cannot generate a value for a parameter that does not exist in the schema\'s property definitions, leading to this error.'
};

const FunctionCallDebugger: React.FC = () => {
  return (
    <div className="bg-card border border-dashed border-destructive/40 rounded-lg p-6 space-y-4 text-card-foreground">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-6 h-6 text-destructive" aria-hidden="true" />
        <h3 className="text-xl font-bold">Debug a Broken Function Call</h3>
      </div>
      
      <p className="text-muted-foreground">An LLM failed to correctly call a function. Analyze the prompt, schema, and error message to diagnose the problem.</p>

      <div className="space-y-2 pt-2">
        <h4 className="font-semibold">User Prompt:</h4>
        <p className="p-3 bg-muted rounded-md text-foreground italic border">"{debugData.userPrompt}"</p>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">Function Schema (with a bug):</h4>
        <pre className="p-3 bg-muted rounded-md font-mono text-xs text-destructive whitespace-pre-wrap border">
          {JSON.stringify(debugData.buggySchema, null, 2)}
        </pre>
      </div>
      
      <div className="space-y-2" role="status" aria-live="polite">
        <h4 className="font-semibold">LLM Error:</h4>
        <p className="p-3 bg-destructive/10 rounded-md font-mono text-sm text-destructive border border-destructive/30">{debugData.llmError}</p>
      </div>

      <Accordion type="single" collapsible className="w-full pt-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold text-primary hover:text-primary/80">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5" aria-hidden="true" />
              <span>Reveal Explanation</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-muted rounded-b-lg border">
            <p className="text-foreground">{debugData.explanation}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FunctionCallDebugger;
