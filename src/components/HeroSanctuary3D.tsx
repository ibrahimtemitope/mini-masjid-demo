import React, { useState } from 'react';
import {
  ArrowRight,
  Flame,
  HeartHandshake,
  Maximize2,
  Rotate3d,
  ShieldCheck,
  Sparkles,
  Sun,
} from 'lucide-react';
import { CurrencyCode, formatPrice } from '../data/storeData';
import { MasjidVariant } from './InteractiveMasjid3DAtelier';

interface Props {
  currency: CurrencyCode;
  onJumpTo3D: (variant: MasjidVariant) => void;
}

export const HeroSanctuary3D: React.FC<Props> = ({ currency, onJumpTo3D }) => {
  const [heroEdition, setHeroEdition] = useState<'aqsa' | 'nabawi'>('aqsa');
  const [ramadanNightGlow, setRamadanNightGlow] = useState<boolean>(true);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -ny * 10, ry: nx * 12 });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  const displayedPhoto =
    heroEdition === 'nabawi'
      ? '/assets/nabawi-studio.png'
      : ramadanNightGlow
        ? '/assets/aqsa-candlelight-home.jpg'
        : '/assets/aqsa-studio.png';

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-sand-100 via-sand-50 to-sand-100 pb-20 pt-10 sm:pb-28 sm:pt-14"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Heirloom Brand Copy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-olive-600/20 bg-olive-100/70 px-4 py-1.5 text-[12.5px] font-semibold text-olive-800">
              <Sparkles className="h-3.5 w-3.5 text-dome-600" />
              <span>Meaningful Play for Little Hearts · Patented Design</span>
            </div>

            <h1 className="mt-5 font-display text-[2.45rem] font-medium leading-[1.06] tracking-tight text-olive-900 sm:text-[3.5rem] lg:text-[3.9rem]">
              Where Faith Comes to Life{' '}
              <span className="italic text-olive-600">Through Play.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[17px] leading-[1.72] text-olive-800/85 sm:text-[18px]">
              Big enough for children to step right inside (<strong>120 × 120 × 145 cm</strong>).
              Sit on a soft rug, read bedtime prophets’ stories, light a cozy LED lantern, and build
              lifelong love for the masjid — completely screen-free.
            </p>

            {/* Transparent Price & Shipping Pill */}
            <div className="mt-6 inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-sand-300 bg-white px-5 py-3.5 shadow-sm">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wider text-olive-600">
                  Walk-In XL Editions
                </span>
                <p className="font-display text-2xl font-semibold text-olive-900">
                  {formatPrice(595, currency)}
                </p>
              </div>
              <div className="h-8 w-px bg-sand-300" />
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wider text-dome-600">
                  Mini Version
                </span>
                <p className="font-display text-2xl font-semibold text-olive-900">
                  {formatPrice(299, currency)}
                </p>
              </div>
              <span className="rounded-full bg-olive-100 px-3 py-1 text-[12px] font-semibold text-olive-800">
                Free Worldwide Shipping
              </span>
            </div>

            {/* Dual Action CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <a
                href="#bundle-builder"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-olive-800 px-8 py-4 text-[15.5px] font-semibold text-sand-50 shadow-plush transition-all hover:-translate-y-0.5 hover:bg-olive-900"
              >
                <span>Shop MiniMasjid Editions</span>
                <ArrowRight className="h-4 w-4 text-dome-300" />
              </a>

              <button
                type="button"
                onClick={() => onJumpTo3D(heroEdition)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-olive-800/20 bg-white px-7 py-4 text-[15px] font-semibold text-olive-900 transition-all hover:border-olive-800/40 hover:bg-sand-100"
              >
                <Rotate3d className="h-4 w-4 text-olive-700" />
                <span>Hold & Spin in 3D Hologram</span>
              </button>
            </div>

            {/* 4 Tactile Benefit Micro-Cards */}
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Maximize2, title: '145 cm Tall', sub: 'Walk-in XL space' },
                { icon: Sparkles, title: 'Under 5 Min', sub: 'Tool-free slots' },
                { icon: ShieldCheck, title: 'Eco-Safe', sub: '100% recyclable' },
                { icon: HeartHandshake, title: '7.5% Giveback', sub: 'Supports ummah' },
              ].map((b, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-sand-300/80 bg-white/80 p-3.5 backdrop-blur-sm"
                >
                  <b.icon className="h-4 w-4 text-olive-600" />
                  <p className="mt-1.5 text-[13.5px] font-bold text-olive-900">{b.title}</p>
                  <p className="text-[12px] text-olive-700/80">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive 3D Parallax & Lighting Showcase of His Real Photos */}
          <div className="perspective-stage lg:col-span-6">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: 'transform 180ms ease-out',
              }}
              className="preserve-3d relative rounded-[2.25rem] border border-sand-300 bg-white p-3.5 shadow-plush-lg sm:p-5"
            >
              {/* Floating Top Controls on the Photo Frame */}
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                {/* Edition Toggle */}
                <div className="inline-flex rounded-full bg-sand-100 p-1">
                  <button
                    type="button"
                    onClick={() => setHeroEdition('aqsa')}
                    className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-all ${
                      heroEdition === 'aqsa'
                        ? 'bg-olive-800 text-sand-50 shadow'
                        : 'text-olive-700 hover:text-olive-900'
                    }`}
                  >
                    Al-Aqsa XL
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroEdition('nabawi')}
                    className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-all ${
                      heroEdition === 'nabawi'
                        ? 'bg-olive-800 text-sand-50 shadow'
                        : 'text-olive-700 hover:text-olive-900'
                    }`}
                  >
                    Masjid an-Nabawi XL
                  </button>
                </div>

                {/* Day / Cozy Candlelight Toggle */}
                {heroEdition === 'aqsa' && (
                  <button
                    type="button"
                    onClick={() => setRamadanNightGlow((p) => !p)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-all ${
                      ramadanNightGlow
                        ? 'bg-amber-950 text-amber-200'
                        : 'bg-sand-200 text-olive-900'
                    }`}
                  >
                    {ramadanNightGlow ? (
                      <>
                        <Flame className="h-3.5 w-3.5 text-amber-400" />
                        <span>Cozy Lantern Glow: ON</span>
                      </>
                    ) : (
                      <>
                        <Sun className="h-3.5 w-3.5 text-amber-600" />
                        <span>Studio Daylight</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Clean Cropped Real Product Photography */}
              <div className="relative overflow-hidden rounded-[1.65rem] bg-sand-100">
                <img
                  src={displayedPhoto}
                  alt={
                    heroEdition === 'aqsa'
                      ? 'MiniMasjid Al-Aqsa XL Edition'
                      : 'MiniMasjid Masjid an-Nabawi XL Edition'
                  }
                  className="aspect-[4/4.2] w-full object-cover transition-all duration-500"
                />

                {/* Floating 3D Depth Dimension Pill */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/25 bg-black/60 px-4 py-3 text-white backdrop-blur-md">
                  <div>
                    <p className="text-[13px] font-semibold">
                      {heroEdition === 'aqsa'
                        ? 'Al-Aqsa XL · Golden Dome & Jerusalem Tilework'
                        : 'Masjid an-Nabawi XL · Green Dome & Bab As-Salam'}
                    </p>
                    <p className="text-[11.5px] text-sand-200">
                      Real customer home scale · 120 × 120 × 145 cm
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onJumpTo3D(heroEdition)}
                    className="shrink-0 rounded-full bg-dome-400 px-3.5 py-1.5 text-[12px] font-bold text-night-950 hover:bg-dome-300"
                  >
                    Open in 3D →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
