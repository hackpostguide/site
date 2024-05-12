import type { MDXComponents } from 'mdx/types';
import { MarkdownComponents } from '@/components/(postComponents)/MarkdownComponents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...MarkdownComponents,
  };
}