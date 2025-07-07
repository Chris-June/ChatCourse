import React from 'react';

const glossaryTerms = [
  { term: 'Algorithm', definition: 'A set of rules or instructions given to an AI, computer, or other problem-solving machine to help it learn and make decisions on its own.' },
  { term: 'Artificial Intelligence (AI)', definition: 'The simulation of human intelligence in machines that are programmed to think like humans and mimic their actions.' },
  { term: 'Chatbot', definition: 'A computer program designed to simulate conversation with human users, especially over the Internet.' },
  { term: 'Dataset', definition: 'A collection of data. In machine learning, datasets are used to train models.' },
  { term: 'Deep Learning', definition: 'A subfield of machine learning concerned with algorithms inspired by the structure and function of the brain called artificial neural networks.' },
  { term: 'Environment Variable', definition: 'A variable whose value is set outside the program, typically in the operating system. Used to store sensitive information like API keys.' },
  { term: 'Generative AI', definition: 'A type of AI that can create new content, such as text, images, music, and code.' },
  { term: 'Hallucination', definition: 'A phenomenon where an AI model generates false or nonsensical information that is presented as fact.' },
  { term: 'Large Language Model (LLM)', definition: 'A type of AI model designed to understand and generate human-like text. Trained on vast amounts of text data.' },
  { term: 'Machine Learning (ML)', definition: 'A field of AI that enables a system to learn from data rather than through explicit programming.' },
  { term: 'Model', definition: 'In AI, a model is the output of a machine learning algorithm run on data. It represents the rules, numbers, and other data structures that the system has learned.' },
  { term: 'Natural Language Processing (NLP)', definition: 'A branch of AI that helps computers understand, interpret, and manipulate human language.' },
  { term: 'Neural Network', definition: 'A series of algorithms that endeavors to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates.' },
  { term: 'Prompt', definition: 'The input, typically text, given to an AI model to generate a response.' },
  { term: 'Token', definition: 'The basic unit of text that a language model processes. A token can be a word, part of a word, or punctuation.' },
];

const Glossary: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Glossary of Terms</h2>
      <div className="space-y-4">
        {glossaryTerms.map((item, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-300">{item.term}</h3>
            <p className="text-gray-300 mt-1">{item.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Glossary;
