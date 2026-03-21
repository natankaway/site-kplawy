'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  const t = useTranslations('contactPage');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission — replace with actual endpoint
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For now, open mailto as fallback
    const form = e.currentTarget;
    const formData = new FormData(form);
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    window.location.href = `mailto:${t('emailValue')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n---\n${name}\n${email}`)}`;
    setStatus('success');
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-5">
              {t('headline')}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-white/40 max-w-xl mx-auto font-light">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        {/* Email card */}
        <FadeIn delay={0.15}>
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-surface-1/30 border border-white/[0.04] mb-10">
            <div className="w-10 h-10 bg-brand-blue-dark/10 text-brand-blue-dark rounded-xl flex items-center justify-center shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-xs text-white/30 uppercase tracking-[0.15em] font-semibold mb-0.5">
                {t('emailTitle')}
              </p>
              <a
                href={`mailto:${t('emailValue')}`}
                className="text-brand-blue-dark hover:text-brand-blue-dark/80 transition-colors text-sm font-medium"
              >
                {t('emailValue')}
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Contact Form */}
        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs text-white/30 uppercase tracking-[0.15em] font-semibold mb-2">
                  {t('formName')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full bg-surface-1/40 border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue-dark/30 focus:ring-1 focus:ring-brand-blue-dark/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-white/30 uppercase tracking-[0.15em] font-semibold mb-2">
                  {t('formEmail')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-surface-1/40 border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue-dark/30 focus:ring-1 focus:ring-brand-blue-dark/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs text-white/30 uppercase tracking-[0.15em] font-semibold mb-2">
                {t('formSubject')}
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                className="w-full bg-surface-1/40 border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue-dark/30 focus:ring-1 focus:ring-brand-blue-dark/20 transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs text-white/30 uppercase tracking-[0.15em] font-semibold mb-2">
                {t('formMessage')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full bg-surface-1/40 border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue-dark/30 focus:ring-1 focus:ring-brand-blue-dark/20 transition-all resize-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send size={16} />
                {status === 'sending' ? t('formSending') : t('formSend')}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-green-400"
                  >
                    <CheckCircle size={16} />
                    {t('formSuccess')}
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400"
                  >
                    <AlertCircle size={16} />
                    {t('formError')}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </FadeIn>
      </div>
    </div>
  );
}
