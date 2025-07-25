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
    <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-6 space-y-6">
      <h3 className="text-xl font-bold text-yellow-300 flex items-center"><Scale className="w-6 h-6 mr-3" />Bias Explorer: AI Loan Advisor</h3>
      
      <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
        <Label htmlFor="dataset-toggle" className="text-gray-300 font-medium">Training Dataset:</Label>
        <div className="flex items-center space-x-3">
          <span className={`font-semibold ${!isBiased ? 'text-green-400' : 'text-gray-500'}`}>Balanced</span>
          <Switch
            id="dataset-toggle"
            checked={isBiased}
            onCheckedChange={setIsBiased}
            aria-label="Toggle between biased and balanced dataset"
          />
          <span className={`font-semibold ${isBiased ? 'text-red-400' : 'text-gray-500'}`}>Biased</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Applicant Profile */}
        <div className="bg-gray-800 p-4 rounded-lg space-y-3">
          <h4 className="text-lg font-semibold text-white">Applicant Profile</h4>
          <div className="flex items-center"><User className="w-5 h-5 mr-3 text-gray-400" /><span>{applicant.name}</span></div>
          <div className="flex items-center"><DollarSign className="w-5 h-5 mr-3 text-gray-400" /><span>${applicant.income.toLocaleString()} / year</span></div>
          <div className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-3 text-gray-400" /><span>Credit Score: {applicant.creditScore}</span></div>
          <div className={`flex items-center p-2 rounded ${isBiased ? 'bg-red-900/50' : 'bg-green-900/50'}`}>
            <Landmark className={`w-5 h-5 mr-3 ${isBiased ? 'text-red-400' : 'text-green-400'}`} />
            <span className={`${isBiased ? 'text-red-300' : 'text-green-300'}`}>Neighborhood: {applicant.neighborhood}</span>
          </div>
        </div>

        {/* AI Decision */}
        <div className="text-center">
          <button 
            onClick={handleRunAssessment}
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-transform transform hover:scale-105 shadow-lg"
          >
            Run AI Loan Assessment
          </button>
          {decision && (
            <div className={`mt-4 p-4 rounded-lg text-left ${decision.approved ? 'bg-green-900/50 border-green-700' : 'bg-red-900/50 border-red-700'} border`}>
              <h4 className={`text-lg font-bold flex items-center ${decision.approved ? 'text-green-300' : 'text-red-300'}`}>
                {decision.approved ? <CheckCircle2 className="w-6 h-6 mr-2" /> : <AlertTriangle className="w-6 h-6 mr-2" />} 
                Decision: {decision.approved ? 'Approved' : 'Denied'}
              </h4>
              <p className="text-sm text-gray-300 mt-2"><strong className='text-gray-400'>Reasoning:</strong> {decision.reason}</p>
              {decision.biasedFactor && (
                <p className="text-xs text-yellow-400 mt-2 p-2 bg-yellow-900/30 rounded">This decision was influenced by a protected attribute (neighborhood), indicating potential bias.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiasExplorer;

