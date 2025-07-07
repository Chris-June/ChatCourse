import React from 'react';

const readingList = {
  books: [
    { title: 'Superintelligence: Paths, Dangers, Strategies', author: 'Nick Bostrom', description: 'A deep dive into the future of artificial intelligence and its potential risks and rewards.' },
    { title: 'Life 3.0: Being Human in the Age of Artificial Intelligence', author: 'Max Tegmark', description: 'Explores the profound future of life, intelligence, and consciousness.' },
    { title: 'The Master Algorithm', author: 'Pedro Domingos', description: 'An overview of the five main schools of thought in machine learning.' },
  ],
  articles: [
    { title: 'The Unreasonable Effectiveness of Recurrent Neural Networks', author: 'Andrej Karpathy', url: 'http://karpathy.github.io/2015/05/21/rnn-effectiveness/', description: 'A classic blog post demonstrating the power of RNNs for text generation.' },
    { title: 'Attention Is All You Need', author: 'Vaswani et al.', url: 'https://arxiv.org/abs/1706.03762', description: 'The original paper introducing the Transformer architecture, which is the basis for most modern LLMs.' },
  ],
  websites: [
    { name: 'Distill.pub', url: 'https://distill.pub/', description: 'An online journal dedicated to clear, interactive explanations of machine learning research.' },
    { name: 'Hugging Face', url: 'https://huggingface.co/', description: 'A community and platform with thousands of pre-trained models, datasets, and tools.' },
  ],
};

const FurtherReading: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Further Reading: Books</h2>
        <div className="space-y-4">
          {readingList.books.map((item, index) => (
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
