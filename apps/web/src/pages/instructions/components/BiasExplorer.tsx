import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Scale, Landmark, DollarSign, User, AlertTriangle, CheckCircle2 } from 'lucide-react';

const BiasExplorer: React.FC = () => {
  const [isBiased, setIsBiased] = useState(true);
  const [decision, setDecision] = useState<{ approved: boolean; reason: string; biasedFactor: boolean } | null>(null);

  const applicant = {
    name: 'Alex Doe',
    creditScore: 720,
    income: 60000,
    neighborhood: 'Oakwood',
  };

  const handleRunAssessment = () => {
    if (isBiased) {
      // Biased AI heavily penalizes the 'Oakwood' neighborhood based on historical data
      setDecision({
        approved: false,
        reason: 'Loan denied. High default risk associated with applicant\'s neighborhood in historical data.',
        biasedFactor: true,
      });
    } else {
      // Unbiased AI focuses only on financial metrics
      setDecision({
        approved: true,
        reason: 'Loan approved. Applicant meets all financial requirements based on credit score and income.',
        biasedFactor: false,
      });
    }
  };

  return (
    <div className="bg-card text-card-foreground border rounded-xl p-6 space-y-6">
      <h3 className="text-xl font-bold text-foreground flex items-center">
        <Scale className="h-5 w-5 mr-3 text-amber-500" aria-hidden="true" />
        Bias Explorer: AI Loan Advisor
      </h3>
      
      <div className="flex items-center space-x-4 bg-muted p-4 rounded-lg">
        <Label htmlFor="dataset-toggle" className="text-foreground font-medium">Training Dataset:</Label>
        <div className="flex items-center space-x-3">
          <span className={`font-semibold ${!isBiased ? 'text-emerald-500' : 'text-muted-foreground'}`}>Balanced</span>
          <Switch
            id="dataset-toggle"
            checked={isBiased}
            onCheckedChange={setIsBiased}
            aria-label="Toggle between biased and balanced dataset"
          />
          <span className={`font-semibold ${isBiased ? 'text-red-500' : 'text-muted-foreground'}`}>Biased</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Applicant Profile */}
        <div className="bg-muted p-4 rounded-lg space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Applicant Profile</h4>
          <div className="flex items-center"><User className="h-5 w-5 mr-3 text-muted-foreground" aria-hidden="true" /><span>{applicant.name}</span></div>
          <div className="flex items-center"><DollarSign className="h-5 w-5 mr-3 text-muted-foreground" aria-hidden="true" /><span>${applicant.income.toLocaleString()} / year</span></div>
          <div className="flex items-center"><CheckCircle2 className="h-5 w-5 mr-3 text-muted-foreground" aria-hidden="true" /><span>Credit Score: {applicant.creditScore}</span></div>
          <div className={`flex items-center p-2 rounded ${isBiased ? 'bg-destructive/10' : 'bg-emerald-500/10'}`}>
            <Landmark className={`h-5 w-5 mr-3 ${isBiased ? 'text-destructive' : 'text-emerald-500'}`} aria-hidden="true" />
            <span className={`${isBiased ? 'text-destructive' : 'text-emerald-600'}`}>Neighborhood: {applicant.neighborhood}</span>
          </div>
        </div>

        {/* AI Decision */}
        <div className="text-center">
          <button 
            onClick={handleRunAssessment}
            className="w-full inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium py-3 px-6 hover:bg-primary/90 transition-colors"
          >
            Run AI Loan Assessment
          </button>
          {decision && (
            <div aria-live="polite" className={`mt-4 p-4 rounded-lg text-left ${decision.approved ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-destructive/10 border-destructive/30'} border`}>
              <h4 className={`text-lg font-bold flex items-center ${decision.approved ? 'text-emerald-600' : 'text-destructive'}`}>
                {decision.approved ? <CheckCircle2 className="h-5 w-5 mr-2" aria-hidden="true" /> : <AlertTriangle className="h-5 w-5 mr-2" aria-hidden="true" />} 
                Decision: {decision.approved ? 'Approved' : 'Denied'}
              </h4>
              <p className="text-sm text-muted-foreground mt-2"><strong className='text-foreground'>Reasoning:</strong> {decision.reason}</p>
              {decision.biasedFactor && (
                <p role="note" className="text-xs mt-2 p-2 rounded bg-amber-500/10 text-amber-600">This decision was influenced by a protected attribute (neighborhood), indicating potential bias.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiasExplorer;

