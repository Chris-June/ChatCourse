import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page bg-gray-900 text-white">
      {/* Hero Section */}
      <header className="hero-section text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to IntelliSync Solutions</h1>
        <p className="text-xl mb-8">Your journey into understanding and shaping AI starts here.</p>
        <Link to="/chat" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
          Start Learning
        </Link>
      </header>

      {/* Introduction Section */}
      <section id="learn-more" className="intro-section container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">What is This Project?</h2>
        <p className="text-lg max-w-3xl mx-auto">
          This isn't just another chat application. It's a hands-on learning experience designed for absolute beginners.
          We provide you with a working AI chat template, and together, we'll explore how to customize, enhance, and truly own your AI interactions.
          No coding experience? No problem. That's why we're here.
        </p>
      </section>

      {/* Features Section */}
      <section className="features-section bg-gray-800 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-gray-700 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Modify AI Responses</h3>
              <p>Learn the basics of how AI models generate text and how you can influence their tone, personality, and knowledge.</p>
            </div>
            <div className="feature-card bg-gray-700 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Extend Functionality</h3>
              <p>Discover how to add new features to your chat application, from simple commands to complex integrations.</p>
            </div>
            <div className="feature-card bg-gray-700 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Understand the Code</h3>
              <p>We'll break down the code in simple terms, giving you the confidence to experiment and build on your own.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section text-center py-20">
        <h2 className="text-4xl font-bold mb-6">Ready to Begin?</h2>
        <p className="text-lg mb-8">Join our private group and start your journey into the world of AI development today.</p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer className="footer bg-gray-800 py-6 text-center">
        <p>&copy; 2024 IntelliSync Solutions. An Open-Build Project.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
