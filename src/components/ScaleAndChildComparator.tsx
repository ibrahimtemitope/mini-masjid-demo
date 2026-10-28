import React from 'react';
import { BRAND_STORY_VIDEO_URL } from '../data/storeData';

export const ScaleAndChildComparator: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Unfold flat panels',
      image: '/assets/assembly-flat.png',
    },
    {
      num: '02',
      title: 'Slot together — no tools',
      image: '/assets/step-2-slot.png',
    },
    {
      num: '03',
      title: 'Step inside & play',
      image: '/assets/aqsa-candlelight-home.jpg',
    },
  ];

  return (
    <section id="how-it-works" className="bg-sand-100 py-12 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Part 1: Huge Real-Life Scale Photo + Real Family Video */}
        <h2 className="font-display text-3xl font-medium text-olive-800 sm:text-4xl">
          Big Enough to Step Inside
        </h2>
        <p className="mt-1.5 text-[15.5px] text-olive-800/80">
          120 × 120 × 145 cm · Screen-free play for ages 1–8
        </p>

        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          {/* Huge Real Living-Room Kid Photo */}
          <div className="overflow-hidden rounded-[2rem] border border-sand-300 bg-white p-3 shadow-plush">
            <img
              src="/assets/aqsa-kid-inside-home.jpg"
              alt="Child playing inside the 145 cm MiniMasjid XL in a living room"
              className="aspect-[4/4.3] w-full rounded-[1.5rem] object-cover"
            />
          </div>

          {/* Huge Real Family Video */}
          <div className="overflow-hidden rounded-[2rem] border border-sand-300 bg-white p-3 shadow-plush">
            <video
              src={BRAND_STORY_VIDEO_URL}
              poster="/assets/aqsa-candlelight-home.jpg"
              controls
              playsInline
              muted
              loop
              className="aspect-[4/4.3] w-full rounded-[1.5rem] bg-sand-200 object-cover"
            />
          </div>
        </div>

        {/* Part 2: Ultra-Simple 3-Step Visual Row */}
        <div className="mt-16 sm:mt-20">
          <h2 className="font-display text-3xl font-medium text-olive-800 sm:text-4xl">
            Builds in 5 Minutes
          </h2>
          <p className="mt-1.5 text-[15.5px] text-olive-800/80">
            Zero screws, zero glue — folds flat behind your sofa anytime.
          </p>

          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.num}
                className="overflow-hidden rounded-[1.75rem] border border-sand-300 bg-white p-3.5 shadow-plush"
              >
                <div className="overflow-hidden rounded-2xl bg-sand-100">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="aspect-[4/3.6] w-full object-cover"
                  />
                </div>
                <div className="mt-3.5 flex items-center gap-2.5 px-1.5 pb-1">
                  <span className="rounded-full bg-olive-500 px-2.5 py-0.5 font-mono text-[12px] font-bold text-white">
                    {s.num}
                  </span>
                  <h3 className="text-[16px] font-bold text-olive-800">{s.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
