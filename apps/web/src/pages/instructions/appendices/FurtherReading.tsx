import React from 'react';
import { Book, ShieldCheck, Library, GanttChartSquare, Newspaper, Globe } from 'lucide-react';

// Define types for our data structures
type ResourceItem = {
  title?: string;
  name?: string;
  author?: string;
  description: string;
  url?: string;
};

type Section = {
  title: string;
  icon: React.ReactElement;
  items: ResourceItem[];
};

const sections: Section[] = [
  {
    title: 'Foundational Books',
    icon: <Book className="w-6 h-6 mr-3 text-blue-400" />,
    items: [
      { title: 'Superintelligence: Paths, Dangers, Strategies', author: 'Nick Bostrom', description: 'A deep dive into the future of artificial intelligence and its potential risks and rewards.' },
      { title: 'Life 3.0: Being Human in the Age of Artificial Intelligence', author: 'Max Tegmark', description: 'Explores the profound future of life, intelligence, and consciousness.' },
      { title: 'Human Compatible: Artificial Intelligence and the Problem of Control', author: 'Stuart Russell', description: 'Explores how we can align powerful AI systems with human values.' },
      { title: 'Thinking in Systems', author: 'Donella H. Meadows', description: 'An essential primer on systems thinking and feedback loops.' },
    ]
  },
  {
    title: 'For Builders & Practitioners',
    icon: <GanttChartSquare className="w-6 h-6 mr-3 text-green-400" />,
    items: [
      { title: 'Designing Machine Learning Systems', author: 'Chip Huyen', description: 'A practical guide to building and scaling ML products in production.' },
      { title: 'Deep Learning', author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', description: 'The definitive book on deep learning theory and architecture.' },
    ]
  },
  {
    title: 'Ethics & Society',
    icon: <ShieldCheck className="w-6 h-6 mr-3 text-yellow-400" />,
    items: [
      { title: 'Weapons of Math Destruction', author: 'Cathy O’Neil', description: 'How big data and algorithms increase inequality and threaten democracy.' },
      { title: 'Race After Technology', author: 'Ruha Benjamin', description: 'Investigates how discrimination is embedded in code and systems.' },
      { title: 'You Look Like a Thing and I Love You', author: 'Janelle Shane', description: 'A hilarious, accessible look at the quirks and limitations of AI.' },
    ]
  },
  {
    title: 'Key Papers & Articles',
    icon: <Newspaper className="w-6 h-6 mr-3 text-purple-400" />,
    items: [
      { title: 'Attention Is All You Need', author: 'Vaswani et al.', url: 'https://arxiv.org/abs/1706.03762', description: 'The original paper introducing the Transformer architecture, the basis for most modern LLMs.' },
      { title: 'Toolformer: Language Models Can Teach Themselves to Use Tools', author: 'Schick et al.', url: 'https://arxiv.org/abs/2302.04761', description: 'Introduces a model that learns to use external tools like search engines and calculators via simple APIs.' },
      { title: 'Reflexion: Language Agents with Verbal Reinforcement Learning', author: 'Shinn et al.', url: 'https://arxiv.org/abs/2303.11366', description: 'Details an agentic system that uses self-reflection to improve its performance on complex tasks.' },
      { title: 'On the Dangers of Stochastic Parrots', author: 'Emily Bender, Timnit Gebru, et al.', url: 'https://dl.acm.org/doi/10.1145/3442188.3445922', description: 'A critical perspective on the risks and ethical considerations of large language models.' },
    ]
  },
  {
    title: 'Websites & Communities',
    icon: <Globe className="w-6 h-6 mr-3 text-teal-400" />,
    items: [
      { name: 'IntelliSync Solutions', url: 'https://intellisync.io', description: 'A blog and resource hub focused on building practical, agentic AI systems for real-world applications.' },
      { name: 'Hugging Face', url: 'https://huggingface.co', description: 'A community and platform providing open-source models, datasets, and tools for building with AI.' },
      { name: 'LangChain Docs', url: 'https://docs.langchain.com', description: 'Documentation for LangChain — a framework to build applications powered by language models.' },
      { name: 'LlamaIndex Docs', url: 'https://docs.llamaindex.ai', description: 'Documentation for LlamaIndex — a data framework for connecting custom data sources to LLMs.' },
      { name: 'DSPy – Stanford CRFM', url: 'https://github.com/stanford-crfm/dspy', description: 'Stanford’s declarative framework for building LLM apps using programmatic prompting.' }
    ]
  }
];

const FurtherReading: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-12">
        <Library className="mx-auto h-16 w-16 text-blue-400" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Further Reading</h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          A curated collection of books, papers, and resources to deepen your understanding of AI.
        </p>
      </div>

      <div className="space-y-12">
        {sections.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            <div className="flex items-center mb-6 pb-2 border-b border-zinc-700">
              {section.icon}
              <h2 className="text-2xl font-bold text-white">{section.title}</h2>
            </div>
            <div className="space-y-6">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-zinc-800/50 rounded-xl p-6 hover:bg-zinc-800/70 transition-colors border border-zinc-700/50">
                  <h3 className="text-lg font-semibold text-blue-300">
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {item.title || item.name}
                      </a>
                    ) : (
                      item.title || item.name
                    )}
                  </h3>
                  {item.author && (
                    <p className="text-sm text-gray-400 mb-2">by {item.author}</p>
                  )}
                  <p className="text-gray-300 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FurtherReading;
