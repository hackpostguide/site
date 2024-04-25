import type { MDXComponents } from 'mdx/types';
import { MarkdownComponents } from '@/app/components/(postComponents)/MarkdownComponents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...MarkdownComponents,
  };
}