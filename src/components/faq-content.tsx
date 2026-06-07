'use client';

import { useId, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/fade-in';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <StaggerItem>
      <div
        className={`card-electric overflow-hidden rounded-2xl transition-colors ${
          isOpen ? 'border-brand-blue/40 bg-brand-blue/[0.04]' : ''
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span
            className={`font-display text-lg font-semibold uppercase tracking-tight transition-colors duration-300 md:text-xl ${
              isOpen ? 'text-white' : 'text-white/90 group-hover:text-white'
            }`}
          >
            {question}
          </span>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
              isOpen
                ? 'border-brand-blue/50 bg-brand-blue/15 text-brand-cyan'
                : 'border-white/10 bg-white/[0.04] text-white/60 group-hover:border-brand-blue/30 group-hover:text-brand-blue-bright'
            }`}
          >
            <ChevronDown
              size={18}
              strokeWidth={2.5}
              aria-hidden="true"
              className={`transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </span>
        </button>
        <div
          id={panelId}
          className={`grid transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <p className="px-5 pb-6 text-[15px] font-light leading-relaxed text-white/70 md:px-6">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

export function FaqContent({
  headline,
  faqs,
}: {
  headline: string;
  faqs: Array<{ q: string; a: string }>;
}) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <FadeIn>
            <span className="section-kicker justify-center">
              <HelpCircle size={15} strokeWidth={2.5} aria-hidden="true" />
              FAQ
            </span>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h1 className="mt-5 font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
              {headline}
            </h1>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <StaggerContainer staggerDelay={0.05} className="space-y-3.5">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </StaggerContainer>
        </FadeIn>
      </div>
    </div>
  );
}
