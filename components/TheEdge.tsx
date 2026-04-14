'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ComparisonRow {
  feature: string;
  neuroLens: string | boolean;
  standard1: string | boolean;
  standard2: string | boolean;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: 'Processing Speed',
    neuroLens: '45 seconds',
    standard1: '2-4 hours',
    standard2: '4-6 hours',
  },
  {
    feature: 'Edge-Case Accuracy',
    neuroLens: '97%',
    standard1: '89%',
    standard2: '91%',
  },
  {
    feature: 'Surgeon Integration',
    neuroLens: true,
    standard1: false,
    standard2: false,
  },
  {
    feature: 'Mobile Support',
    neuroLens: true,
    standard1: false,
    standard2: false,
  },
  {
    feature: 'Accessible UI',
    neuroLens: true,
    standard1: false,
    standard2: false,
  },
  {
    feature: 'Real-time Tracking',
    neuroLens: true,
    standard1: false,
    standard2: true,
  },
  {
    feature: 'Cost per Analysis',
    neuroLens: '$15',
    standard1: '$300+',
    standard2: '$400+',
  },
];

// Checkmark Icon
function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-ice drop-shadow-lg"
      style={{
        filter: 'drop-shadow(0 0 4px rgba(185, 214, 242, 0.6))',
      }}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

// Main Component
export default function TheEdge() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!tableRef.current) return;

    // Staggered row animation on scroll
    const rows = tableRef.current.querySelectorAll('tr');
    rows.forEach((row, index) => {
      ScrollTrigger.create({
        trigger: row,
        start: 'center bottom',
        end: 'center center',
        onEnter: () => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          );
        },
      });
    });
  }, { scope: tableRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-sapphire text-ice overflow-hidden py-20"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(3, 83, 164, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(0, 107, 170, 0.3) 0%, transparent 50%)',
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            The Edge
          </h2>
          <p className="text-xl text-ice/70 max-w-2xl mx-auto">
            Why NeuroLens outpaces conventional neuro-oncology workflows.
          </p>
        </div>

        {/* Comparison Table */}
        <div
          ref={tableRef}
          className="overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-ice/20">
                <th className="text-left py-4 px-6 font-bold text-lg">Feature</th>
                <th className="text-center py-4 px-6 font-bold text-lg text-ice">NeuroLens</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-ice/60">Standard 1</th>
                <th className="text-center py-4 px-6 font-bold text-sm text-ice/60">Standard 2</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-ice/10 transition-colors duration-300 hover:bg-ocean/5 ${
                    idx % 2 === 0 ? 'bg-sapphire/50' : 'bg-sapphire/25'
                  }`}
                >
                  <td className="py-4 px-6 font-medium text-base">{row.feature}</td>
                  <td className="py-4 px-6 text-center">
                    {typeof row.neuroLens === 'boolean' ? (
                      row.neuroLens ? (
                        <CheckIcon />
                      ) : (
                        <span className="text-ice/30">—</span>
                      )
                    ) : (
                      <span className="font-semibold text-ice text-glow">{row.neuroLens}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center text-ice/50">
                    {typeof row.standard1 === 'boolean' ? (
                      row.standard1 ? (
                        <CheckIcon />
                      ) : (
                        <span>—</span>
                      )
                    ) : (
                      <span>{row.standard1}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center text-ice/50">
                    {typeof row.standard2 === 'boolean' ? (
                      row.standard2 ? (
                        <CheckIcon />
                      ) : (
                        <span>—</span>
                      )
                    ) : (
                      <span>{row.standard2}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-16 p-8 bg-ocean/10 border border-ice/20 rounded-xl text-center">
          <p className="text-ice/70">
            Developed by{' '}
            <span className="font-bold text-ice">Abhiraam Venigalla</span>
            {' '}— Congressional App Challenge Winner, MA-02
          </p>
        </div>
      </div>

      {/* Gradient Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ice to-transparent opacity-20" />
    </section>
  );
}
