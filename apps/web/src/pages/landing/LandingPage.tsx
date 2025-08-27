/**
  * LandingPage
  * 
  * Purpose: Marketing/intro page for IntelliSync Solutions with hero, features, and footer.
  * 
  * Important: Global styles in `apps/web/src/index.css` set `html, body { overflow: hidden; }`
  * to rely on app-level scroll containers. To ensure this page remains scrollable,
  * the top-level wrapper uses `min-h-screen` and `overflow-y-auto` so the content
  * scrolls within this page container.
  */
import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../../assets/images/Hero.png';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page bg-gray-900 text-white h-screen overflow-y-auto">
      {/* Hero Section */}
      <header className="hero-section relative overflow-hidden pt-48 pb-32 md:pt-56 md:pb-40">
        <div className="absolute inset-0 z-0 h-[120%] -top-[10%]">
          <div className="w-full h-full">
            <img 
              src={HeroImage} 
              alt="AI Network Visualization" 
              className="w-full h-full object-cover object-top opacity-60"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/30 to-gray-900/50"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center pt-16 md:pt-24">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Welcome to IntelliSync Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
            Your journey into understanding and shaping AI starts here.
          </p>
          <Link 
            to="/chat" 
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Chatting
          </Link>
        </div>
      </header>

      {/* Introduction Section */}
      <section id="learn-more" className="intro-section container mx-auto px-6 py-20 text-center ">
        <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">What is This Project?</h2>
        <p className="text-lg max-w-3xl mx-auto ">
          This isn't just another chat application. It's a hands-on learning experience designed for absolute beginners.
          We provide you with a working AI chat template, and together, we'll explore how to customize, enhance, and truly own your AI interactions.
          No coding experience? No problem. That's why we're here.
        </p>
      </section>

      {/* Features Section */}
      <section className="features-section bg-gradient-to-b from-gray-900 to-gray-800 py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl pb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
              Master the Art of Prompt Engineering
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unlock the full potential of AI communication through effective prompt design and optimization
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-blue-500/10">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-500/20 transition-colors">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-white">Craft Effective Prompts</h3>
              <p className="text-gray-300 text-center mb-6">Learn to communicate with AI effectively to get the best possible responses</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Structure clear instructions and context</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Control tone, style, and personality</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use examples and formatting for better results</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-purple-500/10">
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-white">Advanced Techniques</h3>
              <p className="text-gray-300 text-center mb-6">Go beyond basic prompts with professional strategies</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Chain-of-thought prompting for complex reasoning</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Few-shot learning with examples</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Temperature and sampling controls</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-emerald-500/10">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-emerald-500/20 transition-colors">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-white">Real-World Applications</h3>
              <p className="text-gray-300 text-center mb-6">Apply prompt engineering to practical scenarios</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Content creation and editing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Data analysis and summarization</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Creative writing and brainstorming</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              to="/instructions/setup/project-setup" 
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
            >
              Start Learning Prompt Engineering
              <svg className="ml-3 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="footer bg-gray-800 py-6 text-center">
        <p>&copy; 2025 IntelliSync Solutions. An Open-Build Project.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
