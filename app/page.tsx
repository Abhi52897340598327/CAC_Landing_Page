'use client';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-navy to-sapphire">
      {/* Section 1: Hero (Placeholder for 3D Brain) */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10">
          <h1 className="text-6xl md:text-8xl font-bold text-ice tracking-tight mb-4">
            NeuroLens
          </h1>
          <p className="text-xl text-ice/80 max-w-2xl mx-auto">
            Accessible neuro-oncology diagnostics powered by AI
          </p>
          <p className="text-sm text-ice/60 mt-8">
            Scroll to explore the story
          </p>
        </div>
      </section>

      {/* Section 2: App Lifecycle (Placeholder) */}
      <section className="min-h-screen bg-sapphire flex items-center justify-center">
        <div className="text-center text-ice">
          <h2 className="text-4xl font-bold mb-4">App Lifecycle</h2>
          <p className="text-lg text-ice/70">Section 2: Sticky scroll with mobile UI states</p>
        </div>
      </section>

      {/* Section 3: The Tech (Placeholder) */}
      <section className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center text-ice">
          <h2 className="text-4xl font-bold mb-4">The Tech</h2>
          <p className="text-lg text-ice/70">Section 3: 97% Training Accuracy + MRI SVG Animation</p>
        </div>
      </section>

      {/* Section 4: The Edge (Placeholder) */}
      <section className="min-h-screen bg-sapphire flex items-center justify-center">
        <div className="text-center text-ice">
          <h2 className="text-4xl font-bold mb-4">The Edge</h2>
          <p className="text-lg text-ice/70">Section 4: Comparison table with glowing checkmarks</p>
        </div>
      </section>

      {/* Section 5: Social Proof (Placeholder) */}
      <section className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center text-ice">
          <h2 className="text-4xl font-bold mb-4">Social Proof</h2>
          <p className="text-lg text-ice/70">Section 5: Infinite marquee of reviews + footer</p>
        </div>
      </section>
    </main>
  );
}
