import React from 'react';
import { Link } from 'react-router-dom';
import './InstructionsPage.css';

const InstructionsPage: React.FC = () => {
  return (
    <div className="instructions-page bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Setup Instructions</h1>
          <p className="text-xl text-gray-300">Follow these steps to get started with the Chat Application</p>
        </header>

        <div className="space-y-8">
          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">1. Install Prerequisites</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Node.js:</strong> JavaScript runtime environment
                <div className="text-sm text-gray-400 mt-1">
                  Download and install from <a href="https://nodejs.org/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">nodejs.org</a>
                </div>
              </li>
              <li>
                <strong>pnpm:</strong> Fast, disk space efficient package manager
                <div className="bg-gray-700 p-2 rounded mt-1 font-mono text-sm">
                  npm install -g pnpm
                </div>
              </li>
              <li>
                <strong>Visual Studio Code:</strong> Recommended code editor
                <div className="text-sm text-gray-400 mt-1">
                  Download from <a href="https://code.visualstudio.com/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">code.visualstudio.com</a>
                </div>
              </li>
            </ul>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">2. Set Up the Project</h2>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Clone the repository:</strong>
                <div className="bg-gray-700 p-2 rounded mt-1 font-mono text-sm">
                  git clone git@github.com:Chris-June/Chat.git<br />
                  cd Chat
                </div>
              </li>
              <li>
                <strong>Install dependencies:</strong>
                <div className="bg-gray-700 p-2 rounded mt-1 font-mono text-sm">
                  pnpm install
                </div>
              </li>
            </ol>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">3. Configure Your API Key</h2>
            <p className="text-gray-300 mb-4">
              You have two options for providing your OpenAI API key.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-200">Option 1: Environment File (Recommended for Developers)</h3>
                <p className="text-sm text-gray-400 mt-1 mb-2">
                  This key will be used as the default for the application.
                </p>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <strong>Create environment file:</strong>
                    <div className="bg-gray-700 p-2 rounded mt-1 font-mono text-sm">
                      cp .env.example .env.local
                    </div>
                  </li>
                  <li>
                    <strong>Add your OpenAI API key to .env.local:</strong>
                    <div className="bg-gray-700 p-2 rounded mt-1 font-mono text-sm">
                      OPENAI_API_KEY=your-openai-api-key
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Get your API key from <a href="https://platform.openai.com/account/api-keys" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">OpenAI Platform</a>
                    </p>
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200">Option 2: In-App Settings</h3>
                <p className="text-sm text-gray-400 mt-1">
                  You can also add your API key directly in the application. This key will override the default key and is stored only in your browser.
                </p>
                <ol className="list-decimal pl-6 space-y-2 mt-2">
                  <li>Open the application and click on the <strong>Settings</strong> button in the side menu.</li>
                  <li>Paste your API key into the "OpenAI API Key" field.</li>
                  <li>Your key will be saved automatically for future sessions.</li>
                </ol>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">4. Run the Application</h2>
            <div className="space-y-4">
              <div>
                <strong>Start the development server:</strong>
                <div className="bg-gray-700 p-2 rounded mt-1 font-mono text-sm">
                  pnpm dev
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  Open <a href="http://localhost:3000" className="text-blue-400 hover:underline">http://localhost:3000</a> in your browser
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/chat" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Start Chatting
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
