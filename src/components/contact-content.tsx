'use client';

import { Mail, Send } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

type ContactMessages = Record<string, string>;

export function ContactContent({ t }: { t: ContactMessages }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    // Honest behaviour: hand off to the visitor's email client. The compose
    // window opening is the real feedback — we do not fabricate a "sent" state.
    window.location.href = `mailto:${t.emailValue}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n---\n${name}\n${email}`)}`;
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <FadeIn>
            <span className="section-kicker justify-center">
              <Mail size={15} strokeWidth={2.5} aria-hidden="true" />
              {t.emailTitle}
            </span>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h1 className="mt-5 font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl">{t.headline}</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-5 text-lg text-white/70 max-w-xl mx-auto font-light">{t.subtitle}</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div className="card-electric flex items-center gap-4 p-5 rounded-2xl mb-10">
            <div className="w-11 h-11 bg-brand-blue/15 text-brand-cyan rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(46,123,255,0.25)]">
              <Mail size={18} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-white/60 uppercase tracking-[0.15em] font-semibold mb-0.5">{t.emailTitle}</p>
              <a href={`mailto:${t.emailValue}`} className="text-electric hover:opacity-80 transition-opacity text-sm font-semibold">
                {t.emailValue}
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs text-white/60 uppercase tracking-[0.15em] font-semibold mb-2">{t.formName}</label>
                <input id="name" name="name" type="text" required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/55 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 hover:border-white/15 transition-all" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-white/60 uppercase tracking-[0.15em] font-semibold mb-2">{t.formEmail}</label>
                <input id="email" name="email" type="email" required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/55 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 hover:border-white/15 transition-all" />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs text-white/60 uppercase tracking-[0.15em] font-semibold mb-2">{t.formSubject}</label>
              <input id="subject" name="subject" type="text" required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/55 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 hover:border-white/15 transition-all" />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs text-white/60 uppercase tracking-[0.15em] font-semibold mb-2">{t.formMessage}</label>
              <textarea id="message" name="message" rows={6} required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/55 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 hover:border-white/15 transition-all resize-none" />
            </div>

            <div className="flex items-center gap-4">
              <button type="submit" className="btn-electric group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-semibold tracking-wide">
                <Send size={16} aria-hidden="true" />
                {t.formSend}
              </button>
            </div>
          </form>
        </FadeIn>
      </div>
    </div>
  );
}
