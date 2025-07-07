import React from 'react';

const readingList = {
  ai: [
    { title: 'Superintelligence: Paths, Dangers, Strategies', author: 'Nick Bostrom', description: 'A deep dive into the future of artificial intelligence and its potential risks and rewards.' },
    { title: 'Life 3.0: Being Human in the Age of Artificial Intelligence', author: 'Max Tegmark', description: 'Explores the profound future of life, intelligence, and consciousness.' },
    { title: 'Human Compatible: Artificial Intelligence and the Problem of Control', author: 'Stuart Russell', description: 'Explores how we can align powerful AI systems with human values.' },
    { title: 'Architects of Intelligence', author: 'Martin Ford', description: 'Interviews with top AI minds exploring the future of artificial intelligence.' },
    { title: 'The Master Algorithm', author: 'Pedro Domingos', description: 'An overview of the five main schools of thought in machine learning.' },
  ],
  consciousness: [
    { title: 'How to Create a Mind', author: 'Ray Kurzweil', description: 'A theory of how the brain works and how we might recreate intelligence.' },
    { title: 'The Feeling of Life Itself', author: 'Christof Koch', description: 'A neuroscientific look into the nature of consciousness.' },
  ],
  ethics: [
    { title: 'Weapons of Math Destruction', author: 'Cathy O’Neil', description: 'How big data and algorithms increase inequality and threaten democracy.' },
    { title: 'Race After Technology', author: 'Ruha Benjamin', description: 'Investigates how discrimination is embedded in code and systems.' },
    { title: 'You Look Like a Thing and I Love You', author: 'Janelle Shane', description: 'A hilarious, accessible look at the quirks and limitations of AI.' },
  ],
  systems: [
    { title: 'Thinking in Systems', author: 'Donella H. Meadows', description: 'An essential primer on systems thinking and feedback loops.' },
    { title: 'The Systems View of Life', author: 'Fritjof Capra & Pier Luigi Luisi', description: 'Integrates biological, cognitive, and social systems into a holistic framework.' },
  ],
  builders: [
    { title: 'Designing Machine Learning Systems', author: 'Chip Huyen', description: 'A practical guide to building and scaling ML products in production.' },
    { title: 'Deep Learning', author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', description: 'The definitive book on deep learning theory and architecture.' },
  ],
  articles: [
    { title: 'The Unreasonable Effectiveness of Recurrent Neural Networks', author: 'Andrej Karpathy', url: 'http://karpathy.github.io/2015/05/21/rnn-effectiveness/', description: 'A classic blog post demonstrating the power of RNNs for text generation.' },
    { title: 'Attention Is All You Need', author: 'Vaswani et al.', url: 'https://arxiv.org/abs/1706.03762', description: 'The original paper introducing the Transformer architecture, which is the basis for most modern LLMs.' },
    {
      title: 'Deep Learning',
      author: 'Yann LeCun, Yoshua Bengio, Geoffrey Hinton',
      url: 'https://www.nature.com/articles/nature14539',
      description: 'A seminal article from Nature summarizing the rise and impact of deep learning techniques.'
    },
    {
      title: 'The Lottery Ticket Hypothesis',
      author: 'Jonathan Frankle, Michael Carbin',
      url: 'https://arxiv.org/abs/1803.03635',
      description: 'Reveals that large neural networks often contain smaller subnetworks that can train just as well, changing how we think about model pruning.'
    },
    {
      title: 'AutoGPT, BabyAGI, and the Rise of Agent-Based LLMs',
      author: 'Sebastian Raschka',
      url: 'https://sebastianraschka.com/blog/2023/llm-agents.html',
      description: 'A concise breakdown of how LLMs are being orchestrated into agentic workflows using tools, memory, and environment context.'
    },
    {
      title: 'Reflexion: Language Agents with Verbal Reinforcement Learning',
      author: 'Shinn et al.',
      url: 'https://arxiv.org/abs/2303.11366',
      description: 'Introduces a self-reflective feedback loop into LLM agents to improve task performance over time.'
    },
    {
      title: 'CAMEL: Communicative Agents for Mind Exploration of LLM Society',
      author: 'Liu et al.',
      url: 'https://arxiv.org/abs/2303.17760',
      description: 'Simulates structured dialogue between AI roles to explore emergent behavior in multi-agent systems.'
    },
    {
      title: 'The Art of Prompt Engineering with OpenAI API',
      author: 'Jay Alammar',
      url: 'https://jalammar.github.io/illustrated-gpt-prompts/',
      description: 'A visual guide to crafting better prompts using practical techniques and token-aware design.'
    },
    {
      title: 'A Guide to ChatGPT Plugins, APIs, and LangChain',
      author: 'AssemblyAI',
      url: 'https://www.assemblyai.com/blog/langchain-guide/',
      description: 'Covers plugin and orchestration strategies to expand LLM functionality using LangChain-like architectures.'
    },
    {
      title: 'OpenAI Cookbook',
      author: 'OpenAI',
      url: 'https://github.com/openai/openai-cookbook',
      description: 'A GitHub repository packed with code examples, prompt recipes, and OpenAI best practices.'
    },
    {
      title: 'On the Dangers of Stochastic Parrots',
      author: 'Emily Bender, Timnit Gebru, et al.',
      url: 'https://dl.acm.org/doi/10.1145/3442188.3445922',
      description: 'A thought-provoking critique of LLM development, focusing on ethical and societal consequences.'
    },
    {
      title: 'Model Cards for Model Reporting',
      author: 'Margaret Mitchell et al.',
      url: 'https://arxiv.org/abs/1810.03993',
      description: 'Proposes standardized documentation for AI models to increase transparency and accountability.'
    }
  ],
  websites: [
    {
      name: 'IntelliSync Solutions',
      url: 'https://intellisync.io',
      description: 'A Canadian AI-first development studio specializing in no-code agentic apps, custom GPT interfaces, and smart automation workflows for small businesses and entrepreneurs.'
    },
    { name: 'Distill.pub',
      url: 'https://distill.pub/',
      description: 'An online journal dedicated to clear, interactive explanations of machine learning research.' 
    },

    { name: 'Hugging Face',
      url: 'https://huggingface.co/',
      description: 'A community and platform with thousands of pre-trained models, datasets, and tools.'
    },
    {
      name: 'OpenAI Cookbook',
      url: 'https://github.com/openai/openai-cookbook',
      description: 'A collection of practical guides and code snippets for using OpenAI models effectively, including prompt engineering, function calling, and workflows.'
    },
    {
      name: 'Prompt Engineering Guide',
      url: 'https://www.promptingguide.ai',
      description: 'An open-source guide on prompt engineering techniques, including examples, principles, and prompt patterns.'
    },
    {
      name: 'Awesome ChatGPT Prompts',
      url: 'https://github.com/f/awesome-chatgpt-prompts',
      description: 'A large, community-driven list of creative and useful ChatGPT prompts for various use cases.'
    },
    {
      name: 'LangChain Docs',
      url: 'https://docs.langchain.com',
      description: 'Documentation for LangChain — a framework to build applications powered by language models with tools, memory, and agents.'
    },
    {
      name: 'Chainlit',
      url: 'https://docs.chainlit.io',
      description: 'A framework for rapidly building and debugging LLM-powered apps with live feedback and session tracking.'
    },
    {
      name: 'Semantic Kernel by Microsoft',
      url: 'https://learn.microsoft.com/en-us/semantic-kernel/',
      description: 'Microsoft’s orchestration framework for combining AI services, memory, and skills into production-ready workflows.'
    },
    {
      name: 'Anthropic Prompting Docs',
      url: 'https://docs.anthropic.com/claude/docs',
      description: 'Documentation for Claude models by Anthropic, including best practices in prompting and explanations of Constitutional AI.'
    },
    {
      name: 'DSPy – Stanford CRFM',
      url: 'https://github.com/stanford-crfm/dspy',
      description: 'Stanford’s declarative framework for building LLM apps using programmatic prompting, ideal for structured and agentic tasks.'
    }
  ],
};

const FurtherReading: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">AI & Intelligence</h2>
        <div className="space-y-4">
          {readingList.ai.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-300">{item.title}</h3>
              <p className="text-sm text-gray-400 mb-2">by {item.author}</p>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Consciousness & Minds</h2>
        <div className="space-y-4">
          {readingList.consciousness.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-300">{item.title}</h3>
              <p className="text-sm text-gray-400 mb-2">by {item.author}</p>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Ethics & Society</h2>
        <div className="space-y-4">
          {readingList.ethics.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-300">{item.title}</h3>
              <p className="text-sm text-gray-400 mb-2">by {item.author}</p>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Systems Thinking</h2>
        <div className="space-y-4">
          {readingList.systems.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-300">{item.title}</h3>
              <p className="text-sm text-gray-400 mb-2">by {item.author}</p>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">For Builders</h2>
        <div className="space-y-4">
          {readingList.builders.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-300">{item.title}</h3>
              <p className="text-sm text-gray-400 mb-2">by {item.author}</p>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Further Reading: Articles & Papers</h2>
        <div className="space-y-4">
          {readingList.articles.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-300 hover:underline">{item.title}</a>
              <p className="text-sm text-gray-400 mb-2">by {item.author}</p>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Websites & Communities</h2>
        <div className="space-y-4">
          {readingList.websites.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-300 hover:underline">{item.name}</a>
              <p className="text-gray-300 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FurtherReading;
