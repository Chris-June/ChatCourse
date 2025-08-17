import React from 'react';
import { Wrench, Network, Server, Sparkles, FlaskConical } from 'lucide-react';

type ToolItem = {
  name: string;
  url: string;
  description: string;
};

type Section = {
  title: string;
  icon: React.ReactElement;
  items: ToolItem[];
};

const sections: Section[] = [
  {
    title: 'LLM Orchestration & Agents',
    icon: <Network className="w-6 h-6 mr-3 text-blue-400" />,
    items: [
      { name: 'LangChain', url: 'https://www.langchain.com/', description: 'A framework for developing applications powered by language models, focusing on composition and modularity.' },
      { name: 'LlamaIndex', url: 'https://www.llamaindex.ai/', description: 'A data framework for building LLM applications over custom data, specializing in retrieval-augmented generation (RAG).' },
      { name: 'DSPy', url: 'https://github.com/stanford-crfm/dspy', description: 'Stanford’s declarative framework for programming with language models, not just prompting them.' },
    ]
  },
  {
    title: 'Model Providers & APIs',
    icon: <Server className="w-6 h-6 mr-3 text-green-400" />,
    items: [
      { name: 'OpenAI', url: 'https://openai.com/', description: 'The organization behind GPT-4, offering powerful APIs for a wide range of language and vision tasks.' },
      { name: 'Anthropic', url: 'https://www.anthropic.com/', description: 'Creators of the Claude family of models, focused on AI safety and helpfulness.' },
      { name: 'Hugging Face', url: 'https://huggingface.co/', description: 'A major hub for open-source models, datasets, and tools for the AI community.' },
      { name: 'Together AI', url: 'https://www.together.ai', description: 'A cloud platform for running, fine-tuning, and serving open-source AI models.' },
    ]
  },
  {
    title: 'Creative & Generative Tools',
    icon: <Sparkles className="w-6 h-6 mr-3 text-yellow-400" />,
    items: [
      { name: 'Midjourney', url: 'https://www.midjourney.com/', description: 'A powerful text-to-image AI for creating high-quality, artistic visuals.' },
      { name: 'ElevenLabs', url: 'https://elevenlabs.io/', description: 'State-of-the-art AI for voice synthesis and cloning, used for narration, dubbing, and character creation.' },
      { name: 'Pika Labs', url: 'https://pika.art/', description: 'An AI-driven video generation tool that transforms text prompts into animated video content.' },
    ]
  },
  {
    title: 'Developer & Experimentation',
    icon: <FlaskConical className="w-6 h-6 mr-3 text-purple-400" />,
    items: [
      { name: 'OpenAI Playground', url: 'https://platform.openai.com/playground', description: 'Directly interact with and test OpenAI models like GPT-4 with various settings.' },
      { name: 'Google Colab', url: 'https://colab.research.google.com/', description: 'A free, cloud-based Jupyter notebook environment with GPU access, perfect for running AI experiments.' },
      { name: 'Perplexity AI', url: 'https://www.perplexity.ai', description: 'A conversational AI and search engine hybrid that provides citations and up-to-date web knowledge.' },
    ]
  }
];

const ToolsAndResources: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-12">
        <Wrench className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Tools & Resources</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          A curated list of essential platforms, libraries, and tools for building with AI.
        </p>
      </div>

      <div className="space-y-12">
        {sections.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            <div className="flex items-center mb-6 pb-2 border-b border-border">
              {section.icon}
              <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
            </div>
            <div className="space-y-6">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-muted/30 rounded-xl p-6 hover:bg-muted/40 transition-colors border border-border">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background rounded-md">
                    {item.name}
                  </a>
                  <p className="text-muted-foreground mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ToolsAndResources;
