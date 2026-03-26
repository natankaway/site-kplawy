'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/fade-in';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StaggerItem>
      <div className="border-b border-white/[0.06] last:border-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-6 text-left group"
        >
          <span className="text-base font-medium pr-8 group-hover:text-brand-blue-dark transition-colors duration-300">
            {question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="shrink-0"
          >
            <ChevronDown size={18} className="text-white/30" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm text-white/40 leading-relaxed font-light pb-6">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
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
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-5">{headline}</h1>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div className="bg-surface-1/30 rounded-2xl border border-white/[0.04] px-6 md:px-8">
            <StaggerContainer staggerDelay={0.05}>
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
