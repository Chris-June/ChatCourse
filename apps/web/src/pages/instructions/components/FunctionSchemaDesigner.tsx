import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';

type Parameter = {
  id: number;
  name: string;
  type: 'string' | 'number' | 'boolean';
  description: string;
  required: boolean;
};

const FunctionSchemaDesigner: React.FC = () => {
  const [functionName, setFunctionName] = useState('get_current_weather');
  const [functionDescription, setFunctionDescription] = useState('Get the current weather in a given location');
  const [parameters, setParameters] = useState<Parameter[]>([
    { id: 1, name: 'location', type: 'string', description: 'The city and state, e.g. San Francisco, CA', required: true },
    { id: 2, name: 'unit', type: 'string', description: 'Temperature unit', required: false },
  ]);
  const [generatedSchema, setGeneratedSchema] = useState('');

  useEffect(() => {
    const schema = {
      type: 'function',
      function: {
        name: functionName,
        description: functionDescription,
        parameters: {
          type: 'object',
          properties: parameters.reduce((acc, param) => {
            if (param.name) {
              acc[param.name] = {
                type: param.type,
                description: param.description,
              };
            }
            return acc;
          }, {} as any),
          required: parameters.filter(p => p.required && p.name).map(p => p.name),
        },
      },
    };
    setGeneratedSchema(JSON.stringify(schema, null, 2));
  }, [functionName, functionDescription, parameters]);

  const addParameter = () => {
    setParameters([...parameters, { id: Date.now(), name: '', type: 'string', description: '', required: false }]);
  };

  const removeParameter = (id: number) => {
    setParameters(parameters.filter(p => p.id !== id));
  };

  const handleParamChange = (id: number, field: keyof Parameter, value: string | boolean) => {
    setParameters(parameters.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-card border rounded-lg text-card-foreground">
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Design Your Function</h3>
        <div className="space-y-2">
          <Label htmlFor="functionName" className="text-muted-foreground">Function Name</Label>
          <Input id="functionName" value={functionName} onChange={e => setFunctionName(e.target.value)} placeholder="e.g., get_current_weather" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="functionDescription" className="text-muted-foreground">Function Description</Label>
          <Textarea id="functionDescription" value={functionDescription} onChange={e => setFunctionDescription(e.target.value)} placeholder="A clear, concise description of what the function does." />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Parameters</h4>
          <div className="space-y-4">
            {parameters.map((param) => (
              <div key={param.id} className="p-4 border rounded-lg bg-muted space-y-3 relative">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeParameter(param.id)} aria-label="Remove parameter">
                  <X className="w-4 h-4" aria-hidden="true" />
                </Button>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`param-name-${param.id}`} className="text-sm text-muted-foreground">Name</Label>
                    <Input id={`param-name-${param.id}`} value={param.name} onChange={e => handleParamChange(param.id, 'name', e.target.value)} placeholder="e.g., location" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`param-type-${param.id}`} className="text-sm text-muted-foreground">Type</Label>
                    <select id={`param-type-${param.id}`} value={param.type} onChange={e => handleParamChange(param.id, 'type', e.target.value)} className="w-full p-2 bg-input border rounded-md text-foreground">
                      <option value="string">string</option>
                      <option value="number">number</option>
                      <option value="boolean">boolean</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`param-desc-${param.id}`} className="text-sm text-muted-foreground">Description</Label>
                  <Input id={`param-desc-${param.id}`} value={param.description} onChange={e => handleParamChange(param.id, 'description', e.target.value)} placeholder="A description for this parameter" />
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id={`param-req-${param.id}`} checked={param.required} onChange={e => handleParamChange(param.id, 'required', e.target.checked)} className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                    <Label htmlFor={`param-req-${param.id}`} className="text-sm text-muted-foreground">Required</Label>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={addParameter} variant="outline" className="mt-4">
            <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
            Add Parameter
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Generated OpenAI Schema</h3>
        <pre className="bg-muted text-sm text-foreground p-4 rounded-md overflow-x-auto h-full min-h-[400px] border" aria-live="polite" role="status">
          <code>
            {generatedSchema}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default FunctionSchemaDesigner;
