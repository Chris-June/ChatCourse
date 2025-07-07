import React from 'react';

const toolList = {
  platforms: [
    { name: 'OpenAI Playground', url: 'https://platform.openai.com/playground', description: 'Directly interact with OpenAI models like GPT-3 and GPT-4.' },
    { name: 'Hugging Face', url: 'https://huggingface.co/', description: 'A major hub for pre-trained models, datasets, and AI-powered applications.' },
    { name: 'Google Colab', url: 'https://colab.research.google.com/', description: 'Free, cloud-based Jupyter notebook environment with access to GPUs, perfect for running AI experiments.' },
  ],
  specializedTools: [
    { name: 'Midjourney', url: 'https://www.midjourney.com/', description: 'A powerful text-to-image AI for creating high-quality, artistic visuals.' },
    { name: 'RunwayML', url: 'https://runwayml.com/', description: 'A suite of creative AI tools for video editing, image generation, and more.' },
    { name: 'LALAL.AI', url: 'https://www.lalal.ai/', description: 'An AI-powered tool for separating vocal and instrumental stems from any audio or video.' },
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
