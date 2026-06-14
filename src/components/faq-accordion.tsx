'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './fade-in';

export type Faq = { q: string; a: string };

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <StaggerItem as="li">
      <div
        className={`card-electric overflow-hidden rounded-2xl transition-colors motion-reduce:transition-none ${
          isOpen ? 'border-brand-blue/40 bg-brand-blue/[0.04]' : ''
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-bright focus-visible:ring-inset md:px-6"
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span
            className={`font-display text-lg font-semibold uppercase tracking-tight transition-colors duration-300 motion-reduce:transition-none md:text-xl ${
              isOpen ? 'text-white' : 'text-white/90 group-hover:text-white'
            }`}
          >
            {question}
          </span>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 motion-reduce:transition-none ${
              isOpen
                ? 'border-brand-blue/50 bg-brand-blue/15 text-brand-blue-bright'
                : 'border-white/10 bg-white/[0.04] text-white/70 group-hover:border-brand-blue/30 group-hover:text-brand-blue-bright'
            }`}
          >
            <ChevronDown
              size={18}
              strokeWidth={2.5}
              aria-hidden="true"
              className={`transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:transition-none ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </span>
        </button>
        <div
          id={panelId}
          className={`grid transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:transition-none ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <p className="px-5 pb-6 text-[15px] font-light leading-relaxed text-white/80 md:px-6">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <StaggerContainer as="ul" staggerDelay={0.05} className="list-none space-y-3.5">
      {items.map((faq, i) => (
        <FaqItem key={i} question={faq.q} answer={faq.a} />
      ))}
    </StaggerContainer>
  );
}
