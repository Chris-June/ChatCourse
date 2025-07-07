import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Shield, Lock, Lightbulb } from 'lucide-react';

const Lesson8_3: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">8.3: Privacy & Data Security</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-8/8.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/appendices" 
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
          >
            Go to Appendices <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Handling data, especially user data, carries significant responsibility. In AI, where conversations can be personal and sensitive, privacy and security are paramount.
      </p>

      {/* Key Principles */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Core Principles of Data Privacy</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <Shield className="w-8 h-8 mr-4 text-green-400 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg text-white">Data Minimization</h4>
              <p className="text-sm text-gray-400 mt-1">Only collect and store the data that is absolutely necessary for the application to function. If you don't need it, don't ask for it, and don't save it.</p>
            </div>
          </div>
          <div className="flex items-start">
            <Lock className="w-8 h-8 mr-4 text-yellow-400 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg text-white">Anonymization & Pseudonymization</h4>
              <p className="text-sm text-gray-400 mt-1">Remove or replace personally identifiable information (PII) from data before it's processed or stored. This could mean stripping out names, emails, and addresses, or replacing them with generic identifiers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Privacy-Preserving Design
        </h2>
        <p className="text-gray-300 mb-4">
          Imagine you are designing a chatbot for a healthcare provider that helps patients check their symptoms.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-300 mb-4">How would you apply the principles of privacy and security?</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Data Minimization:</strong> What is the absolute minimum information you need from the user? Do you need their name or just their symptoms?</li>
            <li><strong>Anonymization:</strong> What specific data should be anonymized before being sent to the LLM or stored in a log?</li>
            <li><strong>Data Storage:</strong> What information should never be stored at all? Should chat logs be deleted immediately after the session?</li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-8/8.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Transparency & Explainability
        </Link>
        <Link 
          to="/instructions/appendices" 
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
        >
          Finish Module & Go to Appendices <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson8_3;