import React from 'react';
import ReactMarkdown from 'react-markdown';

const FormattedAIResponse = ({ text } : {text:string}) => {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default FormattedAIResponse;