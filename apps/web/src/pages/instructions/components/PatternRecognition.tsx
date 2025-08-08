import React from 'react';
import CopyButton from '../../../components/CopyButton';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const patternText = "You are a seasoned travel blogger specializing in budget travel. Create a 3-day itinerary for Lisbon, Portugal. Format it as a daily blog post, including money-saving tips.";

const PatternRecognition: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Example: Applying a Prompt Pattern</CardTitle>
        <p className="text-sm text-muted-foreground">
          Prompt patterns are reusable recipes for success. Instead of starting from scratch, you apply a proven structure to your task. The most common is the 'Persona Pattern'.
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          This pattern provides a reliable framework that can be adapted to many different tasks to produce consistent, high-quality outcomes. It turns prompting from an art into a science.
        </p>
        <div className="relative bg-muted p-4 rounded-md border" role="region" aria-label="Persona pattern example">
          <CopyButton textToCopy={patternText} />
          <div className="text-sm text-foreground/90 font-mono pr-10">
            <p>
              <strong className="text-primary">[Persona]</strong> +{' '}
              <strong className="text-primary">[Task]</strong> +{' '}
              <strong className="text-primary">[Format]</strong>
            </p>
            <br />
            <p>
              <span className="text-foreground">"You are a seasoned travel blogger specializing in budget travel."</span>{' '}
              <span className="text-foreground">"Create a 3-day itinerary for Lisbon, Portugal."</span>{' '}
              <span className="text-foreground">"Format it as a daily blog post, including money-saving tips."</span>
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          <strong>Pro tip:</strong> Start a personal library of effective prompt patterns you discover. This will dramatically speed up your workflow.
        </p>
      </CardContent>
    </Card>
  );
};

export default PatternRecognition;
