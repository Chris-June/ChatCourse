import React, { useState } from 'react';
import { Download, GitBranch, Terminal, Key, Rocket, Check, Copy, AlertTriangle } from 'lucide-react';
import { Button } from '@chat/ui';

type OS = 'windows' | 'macos' | 'linux';

interface CommandBlockProps {
  command: string;
  description?: string;
}

const CommandBlock: React.FC<CommandBlockProps> = ({ command, description }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt -4">
      {description && <p className="text-sm text-gray-400 mb-1">{description}</p>}
      <div className="flex items-center justify-between bg-gray-800 rounded-md p-3 font-mono text-sm">
        <code>{command}</code>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="ml-2 text-gray-400 hover:text-white"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};

interface OsTabProps {
  os: OS;
  currentOs: OS;
  setOs: (os: OS) => void;
  children: React.ReactNode;
}

const OsTab: React.FC<OsTabProps> = ({
  os,
  currentOs,
  setOs,
  children,
}) => (
  <button
    className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
      currentOs === os
        ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400'
        : 'text-gray-400 hover:text-white hover:bg-gray-700'
    }`}
    onClick={() => setOs(os)}
  >
    {children}
  </button>
);

const ProjectSetupPage: React.FC = () => {
  const [currentOs, setCurrentOs] = useState<OS>('windows');
  
  return (
    <div className="prose prose-invert max-w-none p-6">
      <h1 className="text-4xl font-bold mb-8 flex items-center">
        <Rocket className="w-8 h-8 mr-4 text-blue-400" /> 
        Project Setup Guide
      </h1>
      
      <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-4 mb-8">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-yellow-200 font-semibold">Before You Start</h3>
            <p className="text-yellow-100 text-sm mt-1">
              This guide will help you set up the project on your computer. Choose your operating system below.
            </p>
          </div>
        </div>
      </div>
      
      {/* OS Selection Tabs */}
      <div className="border-b border-gray-700 mb-6">
        <nav className="flex space-x-1">
          <OsTab os="windows" currentOs={currentOs} setOs={setCurrentOs}>
            Windows
          </OsTab>
          <OsTab os="macos" currentOs={currentOs} setOs={setCurrentOs}>
            macOS
          </OsTab>
          <OsTab os="linux" currentOs={currentOs} setOs={setCurrentOs}>
            Linux
          </OsTab>
        </nav>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. Install Prerequisites</h2>
        
        {currentOs === 'windows' && (
          <div>
            <h3 className="text-xl font-semibold mb-3">For Windows</h3>
            <ol className="list-decimal list-inside space-y-4">
              <li>
                <strong>Install Node.js (includes npm)</strong>
                <CommandBlock 
                  command="winget install OpenJS.NodeJS.LTS"
                  description="Run in PowerShell (recommended) or download from nodejs.org"
                />
              </li>
              <li>
                <strong>Install pnpm</strong>
                <CommandBlock 
                  command="iwr https://get.pnpm.io/install.ps1 -useb | iex"
                  description="Run in PowerShell as Administrator"
                />
              </li>
              <li>
                <strong>Install Git</strong>
                <CommandBlock 
                  command="winget install --id Git.Git -e --source winget"
                  description="Or download from git-scm.com"
                />
              </li>
            </ol>
          </div>
        )}
        
        {currentOs === 'macos' && (
          <div>
            <h3 className="text-xl font-semibold mb-3">For macOS</h3>
            <ol className="list-decimal list-inside space-y-4">
              <li>
                <strong>Install Homebrew (if not installed)</strong>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Run this command in Terminal to install Homebrew:</p>
                  <CommandBlock 
                    command={`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`}
                    description="The missing package manager for macOS"
                  />
                </div>
              </li>
              <li>
                <strong>Install Node.js and pnpm</strong>
                <CommandBlock 
                  command="brew install node pnpm"
                  description="This installs both Node.js and pnpm"
                />
              </li>
              <li>
                <strong>Install Git (if not already installed)</strong>
                <CommandBlock 
                  command="xcode-select --install"
                  description="Installs Git and other developer tools"
                />
              </li>
            </ol>
          </div>
        )}
        
        {currentOs === 'linux' && (
          <div>
            <h3 className="text-xl font-semibold mb-3">For Linux</h3>
            <p className="text-sm text-gray-400 mb-2">Choose your distribution:</p>
            
            <div className="mb-4">
              <h4 className="font-medium">Ubuntu/Debian</h4>
              <CommandBlock 
                command="curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs"
                description="Install Node.js"
              />
              <CommandBlock 
                command="sudo npm install -g pnpm"
                description="Install pnpm"
              />
            </div>
            
            <div>
              <h4 className="font-medium">Fedora/RHEL</h4>
              <CommandBlock 
                command="curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash - && sudo yum install -y nodejs"
                description="Install Node.js"
              />
              <CommandBlock 
                command="sudo npm install -g pnpm"
                description="Install pnpm"
              />
            </div>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
          <h4 className="font-semibold text-blue-300 mb-2">Verify Installation</h4>
          <p className="text-sm text-blue-200 mb-2">After installation, verify everything is working by running these commands in your terminal:</p>
          <CommandBlock command="node --version" />
          <CommandBlock command="pnpm --version" />
          <CommandBlock command="git --version" />
        </div>
      </section>

      <hr className="my-8 border-zinc-700" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. Get the Project Code</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Download className="w-5 h-5 mr-2 text-blue-400" />
              Option 1: Download ZIP
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Visit the project page: <a href="https://github.com/Chris-June/Chat" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/Chris-June/Chat</a></li>
              <li>Click the green "Code" button, then "Download ZIP"</li>
              <li>Extract the ZIP file to a location you'll remember</li>
            </ol>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <GitBranch className="w-5 h-5 mr-2 text-blue-400" />
              Option 2: Use Git (recommended)
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Open a terminal in your preferred directory</li>
              <li>Run this command to clone the repository:</li>
            </ol>
            <CommandBlock 
              command="git clone https://github.com/Chris-June/Chat.git"
              description="This creates a 'Chat' folder with all project files"
            />
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. Set Up the Project</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Open the Project in VS Code</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Launch VS Code</li>
              <li>Select <span className="font-mono bg-gray-700 px-2 py-0.5 rounded">File → Open Folder...</span></li>
              <li>Navigate to and select the <span className="font-mono bg-gray-700 px-2 py-0.5 rounded">Chat</span> folder you just downloaded/cloned</li>
              <li>If prompted about trusting the authors, click "Yes, I trust the authors"</li>
            </ol>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Install Dependencies</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Open the integrated terminal in VS Code (<span className="font-mono bg-gray-700 px-2 py-0.5 rounded">Terminal → New Terminal</span>)</li>
              <li>Run the following command to install all required packages:</li>
            </ol>
            <CommandBlock 
              command="pnpm install"
              description="This may take a few minutes"
            />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">6. Add Your OpenAI API Key</h3>
            
            <div className="mb-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
              <h4 className="font-semibold text-blue-300 mb-2">Recommended: Add via Settings (Easiest)</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Start the application (see Step 7 below)</li>
                <li>Click the <strong>Settings</strong> icon (⚙️) in the bottom left corner</li>
                <li>Paste your OpenAI API key in the designated field</li>
                <li><strong>Your API key will be securely stored in your browser. You can clear it at any time by removing it from the settings and clearing your browser's cache.</strong></li>
              </ol>
            </div>
            
            <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold text-gray-300 mb-2">Advanced: Add via .env File</h4>
              <p className="text-sm text-gray-400 mb-3">For developers who prefer managing environment variables directly:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>In the terminal, create a copy of the example environment file:</li>
              </ol>
              <CommandBlock 
                command="cp .env.example .env.local"
                description="Creates a local configuration file"
              />
              <ol start={2} className="list-decimal list-inside space-y-2 text-sm mt-2">
                <li>Open <code>.env.local</code> in your text editor</li>
                <li>Find the line that says <code>OPENAI_API_KEY=</code> and add your API key after the equals sign</li>
                <li>Save the file and restart the application</li>
              </ol>
            </div>
            
            <div className="text-sm bg-yellow-900/30 border-l-4 border-yellow-500 p-4">
              <p className="text-yellow-100">
                💡 <strong>Get your API key:</strong> Visit{' '}
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  platform.openai.com/api-keys
                </a>
                {' '}(requires an OpenAI account)
              </p>
              <p className="text-yellow-100 mt-2">
                🔒 <strong>Security Tip:</strong> Never share your API key or commit it to version control. The <code>.env.local</code> file is automatically added to <code>.gitignore</code>.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Start the Development Server</h2>
        
        <p className="mb-4">You're almost there! Run this command in the terminal to start the application:</p>
        
        <CommandBlock 
          command="pnpm dev"
          description="Starts both the frontend and backend servers"
        />
        
        <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-800">
          <h4 className="font-semibold text-green-300 mb-2">🎉 You're all set!</h4>
          <p className="text-sm text-green-200">
            The application should automatically open in your default browser at{' '}
            <a href="http://localhost:5173" className="underline">http://localhost:5173</a>.
            If it doesn't, you can manually navigate to that address.
          </p>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        
        <div className="bg-indigo-900/20 border border-indigo-800 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-indigo-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.103 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.8 8.18 1.8 12.062 0a.074.074 0 01.078.01c.12.098.246.192.373.292a.077.077 0 01-.006.127 12.6 12.6 0 01-1.873.892.077.077 0 00-.041.104c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 005.994-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.086-1.92-2.4.19-1.04 1.09-1.817 2.1-1.817 1.184 0 2.158 1.086 1.92 2.4-.19 1.04-1.09 1.817-2.1 1.817zm7.96 0c-1.184 0-2.158-1.086-1.92-2.4.19-1.04 1.09-1.817 2.1-1.817 1.183 0 2.157 1.086 1.92 2.4-.19 1.04-1.09 1.817-2.1 1.817z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-indigo-100">Join Our Discord Community</h3>
              <p className="mt-1 text-sm text-indigo-200">Connect with other learners, ask questions, and get help from our private community.</p>
              <a 
                href="https://discord.gg/CrGqs9cxnM" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Join Discord Server
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Troubleshooting</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h3 className="font-semibold text-red-400">❌ Command not found: pnpm</h3>
            <p className="text-sm text-gray-300 mt-1">
              This means pnpm isn't installed or isn't in your system's PATH. Try installing it again using the instructions at the top of this page.
            </p>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h3 className="font-semibold text-yellow-400">⚠️ Port already in use</h3>
            <p className="text-sm text-gray-300 mt-1">
              If you see an error about a port being in use, you can either:
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Close the program using the port, or</li>
                <li>Change the port by modifying the <code className="bg-gray-700 px-1 rounded">vite.config.ts</code> file</li>
              </ul>
            </p>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h3 className="font-semibold text-blue-400">🔍 Need more help?</h3>
            <p className="text-sm text-gray-300 mt-1">
              Check the project's{' '}
              <a href="https://github.com/Chris-June/Chat/issues" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                GitHub Issues
              </a>{' '}
              or join our{' '}
              <a href="https://discord.gg/CrGqs9cxnM" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Discord community
              </a>{' '}
              for support.</p>
          </div>
        </div>
      </section>

      <hr className="my-8 border-zinc-700" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Open the Project in VS Code</h2>
        <ol className="list-decimal list-inside space-y-2 text-lg">
          <li>Launch VS Code.</li>
          <li>Select <strong>File → Open Folder…</strong> and pick the <strong>`Chat`</strong> folder.</li>
          <li>VS Code will ask “<strong>Do you trust the authors?</strong>” Click <strong>Yes</strong>.</li>
        </ol>
      </section>

      <hr className="my-8 border-zinc-700" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center"><Terminal className="w-6 h-6 mr-3 text-blue-400" />5. Install the Project’s Libraries</h2>
        <ol className="list-decimal list-inside space-y-2 text-lg">
          <li>In VS Code choose <strong>Terminal → New Terminal</strong>.</li>
          <li>A panel appears at the bottom. Copy-paste this and press <strong>Enter</strong>:</li>
        </ol>
        <pre className="bg-zinc-800 p-4 rounded-md mt-4"><code className="text-white">pnpm install</code></pre>
        <p className="mt-2 text-lg">Wait until the scrolling stops (≈1 minute).</p>
      </section>

      <hr className="my-8 border-zinc-700" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center"><Key className="w-6 h-6 mr-3 text-blue-400" />6. Add Your AI Key</h2>
        <ol className="list-decimal list-inside space-y-2 text-lg">
          <li>Get a free key on the OpenAI website → <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300"><strong>Create API Key</strong></a>.</li>
          <li>Copy the key (looks like `sk-…`).</li>
          <li>In VS Code’s terminal, run:</li>
        </ol>
        <pre className="bg-zinc-800 p-4 rounded-md mt-4"><code className="text-white">cp .env.example .env.local</code></pre>
        <ol className="list-decimal list-inside space-y-2 text-lg mt-4" start={4}>
          <li>Open <strong>`.env.local`</strong> (left-hand file list).</li>
          <li>Find <code>OPENAI_API_KEY=</code> and paste your key after the `=` sign:</li>
        </ol>
        <pre className="bg-zinc-800 p-4 rounded-md mt-4"><code className="text-white">OPENAI_API_KEY=sk-1234567890abcdef</code></pre>
        <p className="mt-2 text-lg">Save the file (<strong>⌘S</strong> or <strong>Ctrl+S</strong>).</p>
      </section>

      <hr className="my-8 border-zinc-700" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center"><Rocket className="w-6 h-6 mr-3 text-blue-400" />7. Start Chatting!</h2>
        <p className="text-lg">Still in the terminal, run:</p>
        <pre className="bg-zinc-800 p-4 rounded-md mt-4"><code className="text-white">pnpm dev</code></pre>
        <ul className="list-disc list-inside space-y-2 text-lg mt-4">
          <li>First start takes ~20 seconds.</li>
          <li>When you see <code>http://localhost:5173</code>, <strong>click it</strong> (or paste it in your browser).</li>
        </ul>
        <p className="mt-4 text-2xl font-bold">🎉 That’s it! Type a message and watch the AI reply.</p>
      </section>

      <hr className="my-8 border-zinc-700" />

      <section>
        <h2 className="text-2xl font-bold mb-4">8. What’s Next?</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-700">
            <thead className="bg-zinc-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Want to…</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Do this</th>
              </tr>
            </thead>
            <tbody className="bg-zinc-900 divide-y divide-zinc-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-bold">Change the AI’s personality</td>
                <td className="px-6 py-4">Open the <code>api/handler.ts</code> file, scroll to the <em>System Prompt</em> line 135, and rewrite the text inside quotes.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-bold">Tweak responses (tone, format)</td>
                <td className="px-6 py-4">In the chat site, click <strong>Settings → Custom Instructions</strong>.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-bold">Invite friends to play</td>
                <td className="px-6 py-4">Send them this README.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-bold">Learn the techy stuff</td>
                <td className="px-6 py-4">Expand the <strong>Advanced Section</strong> in the README (totally optional).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProjectSetupPage;
