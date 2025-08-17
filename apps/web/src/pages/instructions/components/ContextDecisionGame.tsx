import InteractiveHeader from '@/components/InteractiveHeader';
import { Gamepad2 } from 'lucide-react';

const ContextDecisionGame = () => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 mt-4">
      <InteractiveHeader title="Scenario Game" icon={Gamepad2} className="mb-3" />
      <h3 className="text-lg font-semibold text-white mb-2">Scenario Game: Which Context Applies?</h3>
      <p className="text-gray-400">[Component under construction]</p>
    </div>
  );
};

export default ContextDecisionGame;
