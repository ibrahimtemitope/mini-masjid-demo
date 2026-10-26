import React, { useState } from 'react';
import { Check, Layers, Minimize2, Ruler, ShieldCheck, Users } from 'lucide-react';

type ComparePreset = 'toddler' | 'age5' | 'age8' | 'folded';

const COMPARE_DATA: Record<
  ComparePreset,
  { label: string; heightCm: number; note: string; badge: string }
> = {
  toddler: {
    label: '2-Year-Old (88 cm)',
    heightCm: 88,
    badge: 'Plenty of Standing & Sitting Room',
    note: 'A toddler walks straight through the arched doorway with room to spare for plush cushions and picture books.',
  },
  age5: {
    label: '5-Year-Old (110 cm)',
    heightCm: 110,
    badge: 'Cozy Private Masjid Sanctuary',
    note: 'At 145 cm total height and 120 × 120 cm floor footprint, a 5-year-old sits comfortably inside on a prayer mat.',
  },
  age8: {
    label: '8-Year-Old (128 cm)',
    heightCm: 128,
    badge: 'Shared Sibling Reading & Dua Nook',
    note: 'Two siblings aged 2–8 can curl up inside together with an LED lantern for Ramadan storytelling and Qur’an time.',
  },
  folded: {
    label: 'Folded Flat (~4 cm)',
    heightCm: 12,
    badge: 'Slides Behind Your Sofa or Wardrobe',
    note: 'Finished playing before guests arrive? Unslot the panels in minutes with zero tools and store flat.',
  },
};

export const ScaleAndChildComparator: React.FC = () => {
  const [selected, setSelected] = useState<ComparePreset>('age5');
  const current = COMPARE_DATA[selected];

  const assemblySteps = [
    {
      step: '01',
      title: 'Unfold Flat-Pack Panels',
      desc: 'Take the precision-creased recyclable boards from their slim storage sleeve — zero screws, glue, or sharp tools.',
      image: '/assets/assembly-flat.png',
    },
    {
      step: '02',
      title: 'Slot Walls, Minarets & Dome',
      desc: 'Interlocking tabs click the 4 facades, corner minarets, and vaulted dome together in under 5 minutes.',
      image: '/assets/aqsa-studio.png',
    },
    {
      step: '03',
      title: 'Step Inside & Play Together',
      desc: 'Add a child’s prayer mat, cushions, and a warm LED lantern — then fold flat behind the sofa anytime.',
      image: '/assets/aqsa-candlelight-home.jpg',
    },
  ];

  return (
    <section id="scale-visualizer" className="bg-sand-100 py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: Real Cleaned Family Living-Room Photo (Child Playing Inside!) */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-sand-300 bg-white p-3 shadow-plush">
              <img
                src="/assets/aqsa-kid-inside-home.jpg"
                alt="Child playing inside the 145 cm MiniMasjid Al-Aqsa XL in a cozy living room"
                className="aspect-[4/4.3] w-full rounded-[1.5rem] object-cover"
              />
              <div className="mt-3 flex items-center justify-between rounded-2xl bg-sand-100 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <Users className="h-5 w-5 text-olive-500" />
                  <span className="text-[14px] font-bold text-olive-800">
                    Real family living-room scale
                  </span>
                </div>
                <span className="font-mono text-[12.5px] font-bold text-aqsa-600">
                  120 × 120 × 145 cm
                </span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Scale & Storage Comparator */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-olive-500/25 bg-olive-50 px-3.5 py-1.5 text-[12.5px] font-bold text-olive-700">
              <Ruler className="h-4 w-4 text-olive-500" />
              <span>Engineered Walk-In Scale · Ages 1–8</span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-medium text-olive-800 sm:text-4xl">
              “Is it really big enough to play inside?”
            </h2>

            <p className="mt-3.5 text-[16.5px] leading-relaxed text-olive-800/85">
              MiniMasjid® XL stands <strong>145 cm tall</strong> (nearly 4 ft 9 in) with a generous{' '}
              <strong>120 × 120 cm</strong> floor base — engineered so children step right inside,
              while parents can still fold it completely flat in minutes.
            </p>

            {/* Preset Selector Buttons */}
            <div className="mt-6 flex flex-wrap gap-2">
              {(Object.keys(COMPARE_DATA) as ComparePreset[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelected(key)}
                  className={`rounded-full px-4 py-2 text-[13px] font-bold transition-all ${
                    selected === key
                      ? 'bg-olive-500 text-white shadow-sm'
                      : 'border border-sand-300 bg-white text-olive-800 hover:bg-sand-50'
                  }`}
                >
                  {COMPARE_DATA[key].label}
                </button>
              ))}
            </div>

            {/* Visual Animated Scale Graph */}
            <div className="mt-6 rounded-3xl border border-sand-300 bg-white p-6 shadow-sm">
              <div className="flex h-56 items-end justify-around gap-6 border-b border-sand-200 pb-3">
                {/* Bar 1: MiniMasjid 145 cm */}
                <div className="flex flex-col items-center">
                  <span className="mb-2 font-mono text-[12px] font-bold text-olive-800">
                    145 cm
                  </span>
                  <div
                    style={{ height: '175px' }}
                    className="flex w-24 flex-col items-center justify-between rounded-t-2xl border-2 border-olive-500 bg-olive-50 p-2.5 text-center"
                  >
                    <span className="text-[11px] font-bold text-olive-800">MiniMasjid® XL</span>
                    <span className="rounded-md bg-olive-500 px-2 py-0.5 text-[10px] font-bold text-white">
                      120 cm wide
                    </span>
                  </div>
                </div>

                {/* Bar 2: Selected Comparison */}
                <div className="flex flex-col items-center">
                  <span className="mb-2 font-mono text-[12px] font-bold text-dome-600">
                    {selected === 'folded' ? 'Flat ~4 cm' : `${current.heightCm} cm`}
                  </span>
                  <div
                    style={{
                      height: `${Math.max(22, Math.round((current.heightCm / 145) * 175))}px`,
                    }}
                    className="flex w-24 items-center justify-center rounded-t-2xl border-2 border-dome-500 bg-dome-50 px-2 text-center transition-all duration-500"
                  >
                    {selected === 'folded' ? (
                      <Minimize2 className="h-4 w-4 text-dome-600" />
                    ) : (
                      <span className="text-[11px] font-bold text-dome-600">
                        {current.label.split(' ')[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[14px] font-bold text-olive-800">{current.badge}</p>
                <p className="mt-1 text-[14.5px] leading-relaxed text-olive-800/80">
                  {current.note}
                </p>
              </div>
            </div>

            <ul className="mt-6 grid gap-2.5 text-[14.5px] font-semibold text-olive-800 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-olive-500" />
                <span>Fits prayer mat + cushions inside</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-olive-500" />
                <span>Unfolds &amp; packs flat in &lt; 5 mins</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3-Step Tool-Free Fold & Slot Architecture + Design Patent Banner */}
        <div className="mt-20 rounded-[2.25rem] border border-sand-300 bg-white p-7 shadow-plush sm:p-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-olive-600">
                <Layers className="h-4 w-4 text-olive-500" />
                <span>Easy 3-Step Fold &amp; Slot Assembly</span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-medium text-olive-800 sm:text-3xl">
                Built Together in Minutes — Zero Tools, Zero Mess
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-aqsa-500/20 bg-aqsa-50 px-4 py-2 text-[12.5px] font-bold text-aqsa-600 sm:self-auto">
              <ShieldCheck className="h-4 w-4 text-aqsa-500" />
              <span>Protected Under Official Design Patent</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {assemblySteps.map((item) => (
              <div
                key={item.step}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-sand-300 bg-sand-50 p-5"
              >
                <div>
                  <div className="overflow-hidden rounded-xl bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="aspect-[16/10] w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2.5">
                    <span className="rounded-lg bg-olive-500 px-2.5 py-0.5 font-mono text-[12px] font-bold text-white">
                      {item.step}
                    </span>
                    <h4 className="text-[16px] font-bold text-olive-800">{item.title}</h4>
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-olive-800/80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
