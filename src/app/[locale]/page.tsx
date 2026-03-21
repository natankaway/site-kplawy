import { Hero } from '@/components/hero';
import { FeaturesGrid } from '@/components/features-grid';
import { HowItWorks } from '@/components/how-it-works';
import { PricingCards } from '@/components/pricing-cards';
import { CtaBanner } from '@/components/cta-banner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <PricingCards />
      <CtaBanner />
    </>
  );
}
