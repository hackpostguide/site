import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as prismTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const MarkdownComponents = {
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="py-2" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="text-lg list-disc list-inside py-4 pl-4" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="text-lg list-decimal list-inside py-4 pl-4" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote className="text-lg border-l-4 pl-4 py-2 italic" {...props} />,
  code: ({ node, inline, className, children, ...props }: { node: React.ReactNode, inline: boolean, className: string, children: React.ReactNode }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={prismTheme}
        language={match[1]}
        PreTag="div"
        className="bg-gray-100 px-4 py-2 rounded"
        wrapLines={true}
        wrapLongLines={true}
        // showLineNumbers -> this messes up wrapLongLines
        // lineNumberContainerStyle={{
        //   backgroundColor: '#282c34',
        //   color: '#abb2bf',
        //   borderRight: '1px solid #abb2bf',
        //   paddingRight: '0.5rem',
        // }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code
        className="bg-gray-100 px-2 py-1 rounded inline-block"
        {...props}
      >
        {children}
      </code>
    );
  },
  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = true; //add ability to have internal links later 
    return (
      <a
        className="text-blue-500 hover:text-blue-700 underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}  
      />
    );
  },
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="pt-16" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="pt-8" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="pt-6" {...props} />,
};