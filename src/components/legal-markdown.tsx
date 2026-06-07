import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

// Renders the public legal documents (privacy / terms / account deletion) from
// markdown content. Each element is mapped to the site's design language so the
// rendered policy matches the rest of the pages.
const components: Components = {
  h1: ({ node, ...p }) => (
    <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4" {...p} />
  ),
  h2: ({ node, ...p }) => (
    <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mt-12 mb-4" {...p} />
  ),
  h3: ({ node, ...p }) => (
    <h3 className="text-base font-semibold tracking-tight text-white mt-8 mb-3" {...p} />
  ),
  p: ({ node, ...p }) => (
    <p className="text-[15px] text-white/70 leading-relaxed font-light mb-4" {...p} />
  ),
  ul: ({ node, ...p }) => (
    <ul className="list-disc list-outside ml-5 space-y-2 mb-4 marker:text-brand-blue/60" {...p} />
  ),
  ol: ({ node, ...p }) => (
    <ol className="list-decimal list-outside ml-5 space-y-2 mb-4 marker:text-brand-blue/60" {...p} />
  ),
  li: ({ node, ...p }) => (
    <li className="text-[15px] text-white/70 leading-relaxed font-light pl-1" {...p} />
  ),
  a: ({ node, ...p }) => (
    <a
      className="text-brand-blue-bright hover:text-brand-cyan transition-colors font-medium break-words"
      {...p}
    />
  ),
  strong: ({ node, ...p }) => (
    <strong className="text-white font-semibold" {...p} />
  ),
  em: ({ node, ...p }) => <em className="text-white/80 italic" {...p} />,
  blockquote: ({ node, ...p }) => (
    <blockquote
      className="border-l-2 border-brand-blue/50 pl-4 my-4 text-[15px] text-white/70 font-light [&>p]:mb-2"
      {...p}
    />
  ),
  hr: () => <hr className="my-10 border-white/[0.08]" />,
  table: ({ node, ...p }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm text-left border-collapse" {...p} />
    </div>
  ),
  th: ({ node, ...p }) => (
    <th className="border-b border-white/15 py-2 pr-4 font-semibold text-white align-top" {...p} />
  ),
  td: ({ node, ...p }) => (
    <td className="border-b border-white/[0.06] py-2 pr-4 text-white/70 font-light align-top" {...p} />
  ),
  code: ({ node, ...p }) => (
    <code className="text-xs bg-brand-blue/10 border border-brand-blue/15 px-1.5 py-0.5 rounded text-brand-blue-bright" {...p} />
  ),
};

export function LegalMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
