'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      className="text-3xl sm:text-4xl font-semibold text-gray-900 mt-12 mb-6 tracking-tight"
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id =
      typeof props.children === 'string'
        ? props.children
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
        : '';
    return (
      <h2
        {...props}
        id={id}
        className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-12 mb-6 tracking-tight scroll-mt-24"
      />
    );
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id =
      typeof props.children === 'string'
        ? props.children
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
        : '';
    return (
      <h3
        {...props}
        id={id}
        className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-24"
      />
    );
  },
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      {...props}
      className="text-lg sm:text-xl font-semibold text-gray-900 mt-6 mb-3"
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="text-gray-600 leading-relaxed mb-6" />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href || '';
    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        <a
          {...props}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1F5CFF] hover:underline"
        />
      );
    }

    return (
      <Link href={href} className="text-[#1F5CFF] hover:underline">
        {props.children}
      </Link>
    );
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-disc list-inside space-y-2 mb-6 text-gray-600" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      className="list-decimal list-inside space-y-2 mb-6 text-gray-600"
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="text-gray-600 leading-relaxed" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="border-l-4 border-[#1F5CFF] pl-6 my-6 italic text-gray-700"
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="text-[#1F5CFF] bg-[#eff4ff] px-1.5 py-0.5 rounded text-sm font-mono"
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto mb-6 text-sm"
    />
  ),
  hr: () => <hr className="my-8 border-gray-200" />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-semibold text-gray-900" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="italic" />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const src = typeof props.src === 'string' ? props.src : '';
    return (
      <span className="block my-8">
        <Image
          src={src}
          alt={props.alt || ''}
          width={800}
          height={450}
          className="rounded-xl"
        />
        {props.alt && (
          <span className="block text-center text-sm text-gray-500 mt-2">
            {props.alt}
          </span>
        )}
      </span>
    );
  },
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table {...props} className="w-full border-collapse" />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="border border-gray-200 bg-gray-50 px-4 py-2 text-left font-semibold text-gray-900"
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td {...props} className="border border-gray-200 px-4 py-2 text-gray-600" />
  ),
};

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <article className={cn('prose prose-lg max-w-none')}>
      <MDXRemote {...source} components={components} />
    </article>
  );
}
