'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports with ssr: false to prevent server-side rendering of 3D components
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const AppLifecycle = dynamic(() => import('@/components/AppLifecycle'), { ssr: false });
const TheTech = dynamic(() => import('@/components/TheTech'), { ssr: false });
const TheEdge = dynamic(() => import('@/components/TheEdge'), { ssr: false });
const SocialProof = dynamic(() => import('@/components/SocialProof'), { ssr: false });

// Loading fallback
function SectionLoader() {
  return <div className="min-h-screen bg-navy" />;
}

export default function Home() {
  return (
    <main className="bg-navy">
      {/* Section 1: Hero with 3D Brain */}
      <Suspense fallback={<SectionLoader />}>
        <Hero />
      </Suspense>

      {/* Section 2: App Lifecycle */}
      <Suspense fallback={<SectionLoader />}>
        <AppLifecycle />
      </Suspense>

      {/* Section 3: The Tech */}
      <Suspense fallback={<SectionLoader />}>
        <TheTech />
      </Suspense>

      {/* Section 4: The Edge */}
      <Suspense fallback={<SectionLoader />}>
        <TheEdge />
      </Suspense>

      {/* Section 5: Social Proof & Footer */}
      <Suspense fallback={<SectionLoader />}>
        <SocialProof />
      </Suspense>
    </main>
  );
}
