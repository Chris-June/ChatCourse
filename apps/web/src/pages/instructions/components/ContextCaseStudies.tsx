import { ThumbsDown, ThumbsUp } from 'lucide-react';

interface CaseStudyProps {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  children: React.ReactNode;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ title, icon, bgColor, children }) => {
  const titleId = Math.random().toString(36).slice(2);
  return (
    <div role="group" aria-labelledby={titleId} className={`p-4 rounded-xl border bg-card text-card-foreground shadow-sm ${bgColor}`}>
      <h4 id={titleId} className="text-lg font-semibold text-foreground mb-3 flex items-center">
        {icon}
        {title}
      </h4>
      <div className="font-mono text-xs space-y-3">{children}</div>
    </div>
  );
};

interface MessageBoxProps {
  role: string;
  content: string;
  bgColor: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ role, content, bgColor }) => (
  <div className={`p-2 rounded border bg-muted text-muted-foreground ${bgColor}`}>
    <span className="font-semibold text-foreground capitalize">{role}:</span>
    <p className="whitespace-pre-wrap">{content}</p>
  </div>
);

const ContextCaseStudies = () => {
  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold text-foreground mb-3">Case Study: The Impact of a Single Message</h3>
      <p className="text-muted-foreground mb-4">Notice how including just one extra piece of context—the user's first message—completely changes the quality of the AI's response.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Context case studies">
        <CaseStudy title="Bad Context" icon={<ThumbsDown className="h-5 w-5 mr-2 text-destructive" aria-hidden="true" />} bgColor="">
          <p className="text-muted-foreground mb-2">The system only receives the user's latest message, forgetting the original topic.</p>
          <MessageBox role="User" content="Why is that important?" bgColor="" />
          <MessageBox role="Assistant (Response)" content="'That' is a very general term. Could you please provide more context about what you are referring to? Its importance depends entirely on the subject." bgColor="" />
        </CaseStudy>

        <CaseStudy title="Good Context" icon={<ThumbsUp className="h-5 w-5 mr-2 text-emerald-500" aria-hidden="true" />} bgColor="">
          <p className="text-muted-foreground mb-2">The system receives the full history, understanding the user's question perfectly.</p>
          <MessageBox role="User" content="I'm building a chatbot for customer support." bgColor="" />
          <MessageBox role="User" content="Why is that important?" bgColor="" />
          <MessageBox role="Assistant (Response)" content="It's important for customer support because a well-designed chatbot can provide instant, 24/7 assistance, reduce wait times, and free up human agents to handle more complex issues, ultimately improving customer satisfaction." bgColor="" />
        </CaseStudy>
      </div>
    </div>
  );
};

export default ContextCaseStudies;
