import React from 'react';
import { Download, GitBranch, Terminal, Key, Rocket } from 'lucide-react';

const ProjectSetupPage: React.FC = () => {
  return (
    <div className="prose prose-invert max-w-none p-6">
      <h1 className="text-4xl font-bold mb-8 flex items-center"><Rocket className="w-8 h-8 mr-4 text-blue-400" /> Project Setup Guide</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. What You’re Getting</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>A <strong>chat website</strong> (like ChatGPT) that runs locally on your machine.</li>
          <li>A <strong>private build space</strong> where you can experiment without the whole internet watching.</li>
          <li>The freedom to <strong>fork</strong> (make your own copy) and share ideas with friends.</li>
        </ul>
        <p className="mt-4 text-lg italic">No complex maths, no mysterious jargon—just clear instructions.</p>
      </section>

      <hr className="my-8 border-zinc-700" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. Before You Begin: Tools You’ll Need</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-700">
            <thead className="bg-zinc-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tool</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">What it’s for</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">How to get it</th>
              </tr>
            </thead>
            <tbody className="bg-zinc-900 divide-y divide-zinc-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-bold">GitHub Account</td>
                <td className="px-6 py-4 whitespace-nowrap">Saving and sharing your project.</td>
                <td className="px-6 py-4 whitespace-nowrap"><a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Create a free account</a></td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-bold">Node.js</td>
                <td className="px-6 py-4 whitespace-nowrap">The engine that runs the project’s code.</td>
                <td className="px-6 py-4 whitespace-nowrap"><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Download Node.js (LTS)</a></td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-bold">Visual Studio Code (VS Code)</td>
                <td className="px-6 py-4 whitespace-nowrap">A friendly text editor to open the project.</td>
                <td className="px-6 py-4 whitespace-nowrap"><a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Download VS Code</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm italic text-gray-400">*Tip: “Terminal” is just a text window where you can type commands. Don’t panic—we’ll tell you exactly what to type.*</p>
      </section>

      <hr className="my-8 border-zinc-700" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center"><Download className="w-6 h-6 mr-3 text-blue-400" />3. Get the Project Code</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Option A: The Simple Download</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Visit the project page and click <strong>“Download ZIP.”</strong></li>
              <li>Un-zip the file. You’ll get a folder called <strong>`Chat`</strong>.</li>
            </ol>
            <a href="https://github.com/Chris-June/Chat" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 mt-2 inline-block">Go to GitHub Project Page</a>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 flex items-center"><GitBranch className="w-5 h-5 mr-2" /> Option B: Use Git</h3>
            <p className="text-sm text-gray-400 mb-2">(skip if that word means nothing to you)</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>In VS Code choose <strong>Source Control → Clone Repository</strong>.</li>
              <li>Paste <code>git@github.com:Chris-June/Chat.git</code> when asked.</li>
            </ol>
          </div>
        </div>
        <p className="mt-4 text-lg font-semibold">Either way, remember where you put the folder—you’ll need it soon.</p>
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
                <td className="px-6 py-4">Open <code>api/handler.ts</code>, scroll to the <em>System Prompt</em> near the end, and rewrite the text inside quotes.</td>
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
