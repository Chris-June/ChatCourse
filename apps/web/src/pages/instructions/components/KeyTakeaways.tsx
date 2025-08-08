import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

interface KeyTakeawaysProps {
  points: string[];
}

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ points }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-500" aria-hidden="true" />
          <span>Key Takeaways</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {points.map((point, index) => (
            <li key={index} className="flex items-start text-card-foreground">
              <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-1" aria-hidden="true" />
              <span className="text-sm">{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default KeyTakeaways;
