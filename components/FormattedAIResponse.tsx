import React from 'react';
import ReactMarkdown from 'react-markdown';

const FormattedAIResponse = ({ text }: { text: string }) => {
  return (
    <div className="prose dark:prose-invert prose-sm sm:prose-base max-sm:text-lg lg:prose-lg max-w-none overflow-auto">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default FormattedAIResponse;