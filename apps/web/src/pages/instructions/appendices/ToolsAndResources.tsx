import React from 'react';

const toolList = {
  platforms: [
    { name: 'OpenAI Playground', url: 'https://platform.openai.com/playground', description: 'Directly interact with OpenAI models like GPT-3 and GPT-4.' },
    { name: 'Hugging Face', url: 'https://huggingface.co/', description: 'A major hub for pre-trained models, datasets, and AI-powered applications.' },
    { name: 'Google Colab', url: 'https://colab.research.google.com/', description: 'Free, cloud-based Jupyter notebook environment with access to GPUs, perfect for running AI experiments.' },
    { name: 'Claude AI by Anthropic', url: 'https://claude.ai', description: 'An AI assistant developed by Anthropic focused on helpfulness, honesty, and harmlessness. Offers strong capabilities in long-context reasoning.' },
    { name: 'Perplexity AI', url: 'https://www.perplexity.ai', description: 'A conversational AI and search engine hybrid that provides citations and up-to-date web knowledge.' },
    { name: 'Mistral AI', url: 'https://mistral.ai', description: 'Creators of open-weight foundation models focused on fast and efficient language understanding.' },
    { name: 'Cohere', url: 'https://cohere.com/', description: 'Enterprise-focused AI platform offering fast embedding models and retrieval-augmented generation pipelines.' },
    { name: 'Anthropic Console', url: 'https://console.anthropic.com', description: 'A developer console to experiment and deploy with Claude models from Anthropic.' },
    { name: 'Together AI', url: 'https://www.together.ai', description: 'An open-source focused AI platform offering API access to models like Mixtral, LLaMA, and more at competitive prices.' }
  ],
  specializedTools: [
    { name: 'Midjourney', url: 'https://www.midjourney.com/', description: 'A powerful text-to-image AI for creating high-quality, artistic visuals.' },
    { name: 'RunwayML', url: 'https://runwayml.com/', description: 'A suite of creative AI tools for video editing, image generation, and more.' },
    { name: 'LALAL.AI', url: 'https://www.lalal.ai/', description: 'An AI-powered tool for separating vocal and instrumental stems from any audio or video.' },
    {
      name: 'Leonardo AI',
      url: 'https://leonardo.ai/',
      description: 'An AI art generation platform focused on high-quality, style-consistent asset creation for creative projects and game design.'
    },
    {
      name: 'ElevenLabs',
      url: 'https://www.elevenlabs.io/',
      description: 'State-of-the-art AI voice synthesis and voice cloning platform, used for narration, dubbing, and character creation.'
    },
    {
      name: 'Descript',
      url: 'https://www.descript.com/',
      description: 'AI-powered audio and video editing platform with transcription, voice cloning, and podcast-friendly tools.'
    },
    {
      name: 'Kaiber',
      url: 'https://www.kaiber.ai/',
      description: 'An AI tool for generating animated visuals and transforming ideas into short cinematic content.'
    },
    {
      name: 'Soundraw',
      url: 'https://soundraw.io/',
      description: 'AI music generator that enables creators to compose royalty-free tracks with mood, genre, and customization options.'
    },
    {
      name: 'Pika Labs',
      url: 'https://www.pika.art/',
      description: 'AI-driven video generation tool that transforms text prompts into animated video content with customizable styles.'
    }
  ],
};

const ToolsAndResources: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Major AI Platforms</h2>
        <div className="space-y-4">
          {toolList.platforms.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-300 hover:underline">{item.name}</a>
              <p className="text-gray-300 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Specialized Tools</h2>
        <div className="space-y-4">
          {toolList.specializedTools.map((item, index) => (
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

export default ToolsAndResources;
