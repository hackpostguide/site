import React from 'react';

export const MarkdownComponents = {
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="py-2" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-inside pb-4" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-inside pb-4" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote className="border-l-4 pl-4 py-2 italic" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code className="bg-gray-200 px-2 py-1 rounded" {...props} />,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="py-6" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="py-6" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="py-6" {...props} />,
};