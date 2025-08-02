import { ThumbsDown, ThumbsUp } from 'lucide-react';

interface CaseStudyProps {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  children: React.ReactNode;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ title, icon, bgColor, children }) => (
  <div className={`p-4 rounded-lg ${bgColor}`}>
    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
      {icon}
      {title}
    </h4>
    <div className="font-mono text-xs space-y-3">{children}</div>
  </div>
);

interface MessageBoxProps {
  role: string;
  content: string;
  bgColor: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ role, content, bgColor }) => (
  <div className={`p-2 rounded ${bgColor}`}>
    <span className="font-bold text-gray-300 capitalize">{role}:</span>
    <p className="text-gray-200 whitespace-pre-wrap">{content}</p>
  </div>
);

const ContextCaseStudies = () => {
  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold text-blue-300 mb-3">Case Study: The Impact of a Single Message</h3>
      <p className="text-gray-400 mb-4">Notice how including just one extra piece of context—the user's first message—completely changes the quality of the AI's response.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CaseStudy title="Bad Context" icon={<ThumbsDown className="w-5 h-5 mr-2 text-red-400" />} bgColor="bg-red-900/30">
          <p className="text-gray-400 mb-2">The system only receives the user's latest message, forgetting the original topic.</p>
          <MessageBox role="User" content="Why is that important?" bgColor="bg-gray-800/50" />
          <MessageBox role="Assistant (Response)" content="'That' is a very general term. Could you please provide more context about what you are referring to? Its importance depends entirely on the subject." bgColor="bg-gray-700/50" />
        </CaseStudy>

        <CaseStudy title="Good Context" icon={<ThumbsUp className="w-5 h-5 mr-2 text-green-400" />} bgColor="bg-green-900/30">
          <p className="text-gray-400 mb-2">The system receives the full history, understanding the user's question perfectly.</p>
          <MessageBox role="User" content="I'm building a chatbot for customer support." bgColor="bg-gray-800/50" />
          <MessageBox role="User" content="Why is that important?" bgColor="bg-gray-800/50" />
          <MessageBox role="Assistant (Response)" content="It's important for customer support because a well-designed chatbot can provide instant, 24/7 assistance, reduce wait times, and free up human agents to handle more complex issues, ultimately improving customer satisfaction." bgColor="bg-gray-700/50" />
        </CaseStudy>
      </div>
    </div>
  );
};

export default ContextCaseStudies;
