import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
      <div className="hero-orb left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 opacity-70" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <p className="section-kicker mb-6">Erro 404 / Error 404</p>

        <h1 className="font-display text-[6rem] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-white sm:text-[8rem] md:text-[10rem]">
          404
        </h1>

        <p className="mx-auto mt-6 max-w-md text-lg font-light leading-relaxed text-white/70 md:text-xl">
          Página não encontrada. O lance que você procura não está aqui.
          <br />
          Page not found. The play you are looking for is not here.
        </p>

        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/"
            className="btn-electric button-sheen group inline-flex items-center justify-center gap-3 rounded-full px-10 py-5 text-base font-semibold tracking-wide md:text-lg"
          >
            Voltar ao início / Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
