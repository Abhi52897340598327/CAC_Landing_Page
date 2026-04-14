'use client';

import Hero from '@/components/Hero';
import AppLifecycle from '@/components/AppLifecycle';
import TheTech from '@/components/TheTech';
import TheEdge from '@/components/TheEdge';
import SocialProof from '@/components/SocialProof';

export default function Home() {
  return (
    <main className="bg-navy">
      {/* Section 1: Hero with 3D Brain */}
      <Hero />

      {/* Section 2: App Lifecycle */}
      <AppLifecycle />

      {/* Section 3: The Tech */}
      <TheTech />

      {/* Section 4: The Edge */}
      <TheEdge />

      {/* Section 5: Social Proof & Footer */}
      <SocialProof />
    </main>
  );
}
